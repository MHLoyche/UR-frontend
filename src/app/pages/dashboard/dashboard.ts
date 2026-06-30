import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, map } from 'rxjs';
import { RouterLink } from '@angular/router';

import { ComputerResponse } from '../../models/computer.model';
import { DashboardCounts } from '../../models/dashboard.model';
import { LoanResponse } from '../../models/loan.model';
import { MouseResponse } from '../../models/mouse.model';
import { StudentsResponse } from '../../models/student.model';
import { CaseResponse } from '../../models/case.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {
  private readonly http = inject(HttpClient);
  private readonly today = new Date().toISOString().slice(0, 10); 

  readonly counts = toSignal(
    forkJoin({ 
      computers: this.http.get<ComputerResponse>(
        '/data/mock-data/computers.json'
      ),

      mice: this.http.get<MouseResponse>(
        '/data/mock-data/mouse.json'
      ),

      loans: this.http.get<LoanResponse>(
        '/data/mock-data/loans.json'
      ),

      students: this.http.get<StudentsResponse>(
        '/data/mock-data/users.json'
      ),

      cases: this.http.get<CaseResponse>(
        '/data/mock-data/cases.json'
      ),
    }).pipe(
      map(({ computers, mice, loans, students, cases }): DashboardCounts => ({
        computers: computers.computers.length,
        
        availableComputers: computers.computers.filter(
          computer => !computer.udlaant
        ).length,

        mice: mice.mouse.length,

        availableMice: mice.mouse.filter(
          mouse => !mouse.udlaant
        ).length,

        activeLoans: loans.loans.filter(
          loan => !loan.afleveret
        ).length,

        overdueLoans: loans.loans.filter(
          loan =>
            !loan.afleveret &&
            this.today > loan.udloebsdato
        ).length,

        totalStudents: students.users.length,

        studentsWithLoans:
          new Set(
            loans.loans.map(
              loan => loan.elevnummer
            )
          ).size,

        studentsWithoutLoans:
          students.users.length -
          new Set(
            loans.loans.map(
              loan => loan.elevnummer
            )
          ).size,
          
        blacklistetStudents:
          students.users.filter(
            student => student.blacklistet
          ).length,

        totalCases: cases.cases.length,
        openCases: cases.cases.filter(
          c => !c.afklaret).length,
        closedCases: cases.cases.filter(
          c => c.afklaret).length,
      }))
    ),

    {
      initialValue: {
        computers: 0,
        mice: 0,
        activeLoans: 0,
        overdueLoans: 0,
        totalStudents: 0,
        studentsWithLoans: 0,
        studentsWithoutLoans: 0,
        blacklistetStudents: 0,
        totalCases: 0,
        openCases: 0,
        closedCases: 0,
        availableComputers: 0,
        availableMice: 0,
      },
    }
  );
}