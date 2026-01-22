import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../shared/compoments/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

}
