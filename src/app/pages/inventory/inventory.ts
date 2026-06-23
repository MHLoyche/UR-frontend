import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { forkJoin, map } from 'rxjs';

export interface ComputerJson {
  fabrikant: string;
  model: string;
  computernummer: string;
}

export interface MouseJson {
  mus: string;
  model: string;
  registrationsnummer: string;
}

export interface InventoryRow {
  type: 'Computer' | 'Mouse';
  name: string;
  model: string;
  assetNumber: string;
}

type ComputerResponse = {
  computers: ComputerJson[];
};

type MouseResponse = {
  mouse: MouseJson[];
};

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
  private readonly http = inject(HttpClient);

  readonly inventoryRows$ = forkJoin({
    computers: this.http.get<ComputerResponse>('data/mock-data/computers.json'),
    mice: this.http.get<MouseResponse>('data/mock-data/mouse.json'),
  }).pipe(
    map(({ computers, mice }) => [
      ...computers.computers.map((computer): InventoryRow => ({
        type: 'Computer',
        name: computer.fabrikant,
        model: computer.model,
        assetNumber: computer.computernummer,
      })),
      ...mice.mouse.map((mouse): InventoryRow => ({
        type: 'Mouse',
        name: mouse.mus,
        model: mouse.model || 'N/A',
        assetNumber: mouse.registrationsnummer,
      })),
    ])
  );
}
