import { Component, inject, Input, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SupplierResponse } from '../../models/supplier.models';
import { SupplierService } from '../../../services/Supplier/supplier.service';

@Component({
  standalone: true,
  selector: 'app-user-card',
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input() id!: number;
  isLoading = signal<boolean>(false);
  driver = input<SupplierResponse | null>(null);

  private router = inject(Router);
  private supplierService = inject(SupplierService);

  navigateToDetails(driverId: number) {
    localStorage.setItem('driverId', driverId.toString());
    this.router.navigate(['/driver/details']);
  }

  onDelete(id: number) {
    this.isLoading.set(true);
    try {
      this.supplierService.deleteDriver(id).subscribe({
        next: () => {
          this.isLoading.set(false);
          window.location.reload();
        },
        error: (error) => {
          this.isLoading.set(false);
          console.log(error.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
