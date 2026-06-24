import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, map } from 'rxjs';

import { ComputerResponse } from '../../models/computer.model';
import { DashboardCounts } from '../../models/dashboard.model';
import { LoanResponse } from '../../models/loan.model';
import { MouseResponse } from '../../models/mouse.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
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
    }).pipe(
      map(({ computers, mice, loans }): DashboardCounts => ({
        computers: computers.computers.length,

        mice: mice.mouse.length,

        activeLoans: loans.loans.filter(
          loan => !loan.afleveret
        ).length,

        overdueLoans: loans.loans.filter(
          loan =>
            !loan.afleveret &&
            this.today > loan.udloebsdato
        ).length,
      }))
    ),

    {
      initialValue: {
        computers: 0,
        mice: 0,
        activeLoans: 0,
        overdueLoans: 0,
      },
    }
  );
}