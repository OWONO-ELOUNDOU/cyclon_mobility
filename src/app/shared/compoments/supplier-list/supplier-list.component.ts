import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TableModule } from 'primeng/table';
import { UserCardComponent } from '../user-card/user-card.component';

import { SupplierResponse } from '../../models/supplier.models';
import { SupplierService } from '../../../services/Supplier/supplier.service';

@Component({
  standalone: true,
  selector: 'app-supplier-list',
  imports: [CommonModule, TableModule, UserCardComponent],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.scss'
})
export class SupplierListComponent {
  state = signal<string>('');
  message = signal<string>('');
  hasMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  driversList = signal<SupplierResponse[]>([]);
  
  private router = inject(Router);
  private supplierService = inject(SupplierService);

  constructor() {
    this.fetchUsersList();
  }

  fetchUsersList() {
    this.isLoading.set(true);
    try {
      this.supplierService.getAllDrivers().subscribe({
        next: (data) => {
          this.isLoading.set(false);
          console.log(data);
          this.driversList.set(data);
        },
        error: (error) => {
          this.isLoading.set(false);
          console.log(error);
        }
      })
    } catch (error) {
      this.isLoading.set(false);
      console.log(error);
    }
  }

  navigateToDetails(driverId: number) {
    localStorage.setItem('driverId', driverId.toString());
    this.router.navigate(['/driver/details']);
  }
}
