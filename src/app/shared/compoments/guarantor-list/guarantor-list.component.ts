import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TableModule } from 'primeng/table';

import { Guarantor } from '../../models/guarantor.models';
import { GuarantorService } from '../../../services/Guarantor/guarantor.service';

@Component({
  selector: 'app-guarantor-list',
  imports: [CommonModule, TableModule],
  templateUrl: './guarantor-list.component.html',
  styleUrl: './guarantor-list.component.scss'
})
export class GuarantorListComponent implements OnInit {
  title = signal('Liste des garants');

  private router = inject(Router);
  private guarantorService = inject(GuarantorService);

  guarantors = signal<Guarantor[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.fecthGuarantors();
  }

  fecthGuarantors() {
    try {
      this.guarantorService.getAllGuarantors().subscribe({
        next: (data) => {
          console.log(data);
          this.guarantors.set(data);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
