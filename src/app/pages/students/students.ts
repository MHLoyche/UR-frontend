import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';

export interface StudentJson {
  elevnummer: string;
  navn: string;
  adresse: string;
  postnummerOgBy: string;
  cprNummer: string;
  email: string;
  stamklasse: string;
}

type StudentsResponse = {
  users: StudentJson[];
};

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students {
  private readonly http = inject(HttpClient);

  readonly students$ = this.http.get<StudentsResponse>('data/mock-data/users.json').pipe(
    map(response => response.users)
  );
}
