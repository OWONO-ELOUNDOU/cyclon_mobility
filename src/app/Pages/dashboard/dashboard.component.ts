import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../shared/compoments/navbar/navbar.component';
import { UserListComponent } from '../../shared/compoments/user-list/user-list.component';
import { SupplierListComponent } from '../../shared/compoments/supplier-list/supplier-list.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, NavbarComponent, UserListComponent, SupplierListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

}
