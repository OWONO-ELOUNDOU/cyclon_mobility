import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SupplierResponse } from '../../models/supplier.models';
import { SupplierService } from '../../../services/Supplier/supplier.service';

import { NavbarComponent } from '../navbar/navbar.component';
import { GuarantorDetailsComponent } from '../guarantor-details/guarantor-details.component';

@Component({
  selector: 'app-driver-details',
  imports: [CommonModule, NavbarComponent, GuarantorDetailsComponent],
  templateUrl: './driver-details.component.html',
  styleUrl: './driver-details.component.scss'
})
export class DriverDetailsComponent implements OnInit {
  title = signal<string>('Détails du driver');

  // Injection des services
  private router = inject(Router);
  private supplierService = inject(SupplierService);

  // Déclaration des variables
  driverId = signal<number>(0);
  isGuarantorVisible = signal<boolean>(false);
  driver = signal<SupplierResponse | null>(null);

  constructor() { }

  ngOnInit(): void {
    this.driverId.set(localStorage.getItem('driverId') ? Number(localStorage.getItem('driverId')) : 0);
    this.fetchDriverDetails();
  }

  fetchDriverDetails(): void {
    try {
      this.supplierService.getDriverDetails(this.driverId()).subscribe({
        next: (response: SupplierResponse) => {
          this.driver.set(response);
          console.log(this.driver());
        },
        error: (error) => {
          console.log(error.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  toggleGuarantorVisibility() {
    this.isGuarantorVisible.update(v => !v);
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
