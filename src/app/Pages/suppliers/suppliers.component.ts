import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SupplierService } from '../../services/Supplier/supplier.service';

import { NavbarComponent } from '../../shared/compoments/navbar/navbar.component';
import { StatBadgetComponent } from '../../shared/compoments/stat-badget/stat-badget.component';
import { SupplierListComponent } from '../../shared/compoments/supplier-list/supplier-list.component';

@Component({
  selector: 'app-suppliers',
  imports: [CommonModule, NavbarComponent, SupplierListComponent, StatBadgetComponent],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss'
})
export class SuppliersComponent implements OnInit {
  title = signal<string>('Drivers');

  private router = inject(Router);
  private supplierService = inject(SupplierService);

  driverCount = signal<number>(0);
  countText = 'Nombre de conducteurs';
  pendingText = 'Nombre de conducteurs en attente';
  validatedText = 'Nombre de conducteurs validés';
  driverPendingCount = signal<number>(0);
  driverValidatedCount = signal<number>(0);
  driverUnverifiedCount = computed((): number => this.driverCount() - this.driverPendingCount());

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

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

}
