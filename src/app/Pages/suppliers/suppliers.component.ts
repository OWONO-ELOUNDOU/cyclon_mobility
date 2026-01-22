import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SupplierService } from '../../services/Supplier/supplier.service';

import { NavbarComponent } from '../../shared/compoments/navbar/navbar.component';
import { SupplierListComponent } from '../../shared/compoments/supplier-list/supplier-list.component';

@Component({
  selector: 'app-suppliers',
  imports: [CommonModule, NavbarComponent, SupplierListComponent],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss'
})
export class SuppliersComponent {
  title = signal<string>('Drivers');

  private router = inject(Router);

  constructor() { }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

}
