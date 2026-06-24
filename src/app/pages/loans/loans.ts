import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { LoanResponse, LoanRow } from '../../models/loan.model';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loans.html',
  styleUrl: './loans.css',
})

export class Loans {
  private readonly http = inject(HttpClient);
  private readonly today = new Date().toISOString().slice(0, 10);

  readonly loans$ = this.http
    .get<LoanResponse>('data/mock-data/loans.json')
    .pipe(
      map(response =>
        response.loans.map(
          (loan): LoanRow => ({
            ...loan,
            overdue: !loan.afleveret && this.today > loan.udloebsdato,
          })
        )
      )
    );
}