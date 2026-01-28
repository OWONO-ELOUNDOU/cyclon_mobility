import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierService } from '../../services/Supplier/supplier.service';

import { NavbarComponent } from '../../shared/compoments/navbar/navbar.component';
import { UserListComponent } from '../../shared/compoments/user-list/user-list.component';
import { CardStatComponent } from '../../shared/compoments/card-stat/card-stat.component';
import { SupplierListComponent } from '../../shared/compoments/supplier-list/supplier-list.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, NavbarComponent, UserListComponent, SupplierListComponent, CardStatComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private supplierService = inject(SupplierService);

  driverCount = signal<number>(0);
  countText = 'Nombre total de driver';
  pendingText = 'Nombre total de driver en attente';
  validatdText = 'Nombre total de driver validé';
  driverPendingCount = signal<number>(0);
  driverValidatedCount = signal<number>(0);

  constructor() { }

  ngOnInit(): void {
    this.fecthDriverCount();
    this.fecthPendingCount();
    this.fecthValidatedCount();
  }

  fecthDriverCount() {
    try {
      this.supplierService.getDriverCount().subscribe({
        next: (data) => this.driverCount.set(data.count),
        error: (error) => alert('Erreur lors de l\'affichage du nombre')
      })
    } catch (error) {
      console.log(error);
      alert('Une erreur est survenue');
    }
  }

  fecthPendingCount() {
    try {
      this.supplierService.getPendingValidationCount().subscribe({
        next: (data) => this.driverPendingCount.set(data.count),
        error: (error) => alert('Erreur lors de l\'affichage du nombre')
      })
    } catch (error) {
      console.log(error);
      alert('Une erreur est survenue');
    }
  }

  fecthValidatedCount() {
    try {
      this.supplierService.getValidatedCount().subscribe({
        next: (data) => this.driverValidatedCount.set(data.count),
        error: (error) => alert('Erreur lors de l\'affichage du nombre')
      })
    } catch (error) {
      console.log(error);
      alert('Une erreur est survenue');
    }
  }
}
