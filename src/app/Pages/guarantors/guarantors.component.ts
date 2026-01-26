import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { NavbarComponent } from '../../shared/compoments/navbar/navbar.component';
import { GuarantorListComponent } from '../../shared/compoments/guarantor-list/guarantor-list.component';

@Component({
  selector: 'app-guarantors',
  imports: [CommonModule, NavbarComponent, GuarantorListComponent],
  templateUrl: './guarantors.component.html',
  styleUrl: './guarantors.component.scss'
})
export class GuarantorsComponent {
  title = signal<string>('Liste des garants');

  private router = inject(Router);

  constructor() { }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
