import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Guarantor } from '../../models/guarantor.models';
import { GuarantorService } from '../../../services/Guarantor/guarantor.service';

import { NavbarComponent } from '../navbar/navbar.component';
import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  selector: 'app-guarantor-details',
  imports: [CommonModule, NavbarComponent, ToastMessageComponent],
  templateUrl: './guarantor-details.component.html',
  styleUrl: './guarantor-details.component.scss'
})
export class GuarantorDetailsComponent implements OnInit {
  private router = inject(Router);
  private guarantorService = inject(GuarantorService);

  state = signal<string>('');
  message = signal<string>('');
  isLoading = signal<boolean>(false);
  hasMessage = signal<boolean>(false);
  guarantorDetailsInfo = signal<Guarantor | null>(null);

  constructor() { }

  ngOnInit(): void {
    const id = localStorage.getItem('garantId');
    if (id) {
      this.loadGuarantorDetailsInfo(+id);
    } else {
      this.showMessage('error', 'Aucun ID de garant fourni.');
    }
  }

  loadGuarantorDetailsInfo(id: number) {
    this.isLoading.set(true);
    try {
      this.guarantorService.getGuarantorById(id).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.guarantorDetailsInfo.set(response);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.hasMessage.set(true);
          this.showMessage('error', 'Une erreur est survenue lors du chargement des détails du garant.');
        }
      });
    } catch (error) {
      this.isLoading.set(false);
      this.hasMessage.set(true);
      this.showMessage('error', 'Une erreur est survenue lors du chargement des détails du garant.');
    }
  }

  showMessage(state: string, message: string) {
    this.state.set(state);
    this.message.set(message);
  }

  navigateToDriverDetails(driverId: number | undefined) {
    if (driverId !== undefined) {
      localStorage.setItem('driverId', driverId.toString());
      this.router.navigate(['/driver/details']);
    }
  }
}
