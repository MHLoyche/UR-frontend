import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';

export interface LoanJson {
  elevnummer: string;
  computernummer: string;
  registrationsnummer: string;
  udlaansdato: string;
  udloebsdato: string;
  afleveret: boolean;
}

type LoansResponse = {
  loans: LoanJson[];
};

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loans.html',
  styleUrl: './loans.css',
})
export class Loans {
  private readonly http = inject(HttpClient);

  readonly loans$ = this.http.get<LoansResponse>('data/mock-data/loans.json').pipe(
    map(response => response.loans)
  );
}
