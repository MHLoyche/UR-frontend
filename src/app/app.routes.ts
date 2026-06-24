import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: '',
        component: MainLayout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard) },
            { path: 'loans', loadComponent: () => import('./pages/loans/loans').then(m => m.Loans) },
            { path: 'inventory', loadComponent: () => import('./pages/inventory/inventory').then(m => m.Inventory) },
            { path: 'students', loadComponent: () => import('./pages/students/students').then(m => m.Students) },
            { path: 'cases', loadComponent: () => import('./pages/cases/cases').then(m => m.Cases) }
        ]
    }
];
