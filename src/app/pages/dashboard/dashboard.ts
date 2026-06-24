import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { forkJoin, map } from 'rxjs';

interface ComputersResponse {
  computers: Array<unknown>;
}

interface MouseResponse {
  mouse: Array<unknown>;
}

interface DashboardCounts {
  computers: number;
  mice: number;
  activeLoans: number;
  overdueLoans: number;
}

interface ActiveLoanResponse {
  loans: Array<unknown>;
}

interface OverdueLoanResponse {
  loans: Array<unknown>;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly http = inject(HttpClient);

  readonly counts = toSignal(
    forkJoin({
      computers: this.http.get<ComputersResponse>('/data/mock-data/computers.json'),
      mice: this.http.get<MouseResponse>('/data/mock-data/mouse.json'),
      activeLoans: this.http.get<ActiveLoanResponse>('/data/mock-data/loans.json'),
      overdueLoans: this.http.get<OverdueLoanResponse>('/data/mock-data/loans.json'),
    }).pipe(
      map(({ computers, mice, activeLoans, overdueLoans }): DashboardCounts => ({
        computers: computers.computers.length,
        mice: mice.mouse.length,
        activeLoans: activeLoans.loans.length,
        overdueLoans: overdueLoans.loans.length,
      }))
    ),
    { initialValue: { computers: 0, mice: 0, activeLoans: 0, overdueLoans: 0 } }
  );
}