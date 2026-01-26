import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TableModule } from 'primeng/table';

import { SupplierResponse } from '../../models/supplier.models';
import { SupplierService } from '../../../services/Supplier/supplier.service';

@Component({
  standalone: true,
  selector: 'app-supplier-list',
  imports: [CommonModule, TableModule],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.scss'
})
export class SupplierListComponent {
  driversList = signal<SupplierResponse[]>([]);
  
  private router = inject(Router);
  private supplierService = inject(SupplierService);

  constructor() {
    this.fetchUsersList();
  }

  fetchUsersList() {
    try {
      this.supplierService.getAllDrivers().subscribe({
        next: (data) => {
          console.log(data);
          this.driversList.set(data);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  navigateToDetails(driverId: number) {
    localStorage.setItem('driverId', driverId.toString());
    this.router.navigate(['/driver/details']);
  }
}
