import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

import { CaseResponse } from '../../models/case.model';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cases.html',
  styleUrl: './cases.css',
})

export class Cases {
  private readonly http = inject(HttpClient);

  readonly cases$ = this.http
    .get<CaseResponse>('data/mock-data/cases.json')
    .pipe(
      map(response => response.cases)
    );
}
