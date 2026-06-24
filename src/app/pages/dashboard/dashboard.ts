import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { forkJoin } from 'rxjs';

interface ComputersResponse {
  computers: unknown[];
}

interface MouseResponse {
  mouse: unknown[];
}

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit {
  private readonly http = inject(HttpClient);

  computersCount = 0;
  miceCount = 0;

  ngOnInit(): void {
    forkJoin({
      computers: this.http.get<ComputersResponse>('data/mock-data/computers.json'),
      mice: this.http.get<MouseResponse>('data/mock-data/mouse.json'),
      }).subscribe({
        next: ({ computers, mice }) => {
          this.computersCount = computers.computers.length;
          this.miceCount = mice.mouse.length;
        },
        error: () => {
          this.computersCount = 0;
          this.miceCount = 0;
      },
    });
  }
}