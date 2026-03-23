import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { TableModule } from 'primeng/table';

import { Guarantor } from '../../models/guarantor.models';
import { GuarantorService } from '../../../services/Guarantor/guarantor.service';

import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  selector: 'app-guarantor-list',
  imports: [CommonModule, TableModule, ToastMessageComponent],
  templateUrl: './guarantor-list.component.html',
  styleUrl: './guarantor-list.component.scss'
})
export class GuarantorListComponent implements OnInit {
  title = signal('garants');

  private router = inject(Router);
  private guarantorService = inject(GuarantorService);

  state = signal<string>('');
  message = signal<string>('');
  hasError = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  isFetching = signal<boolean>(false);
  guarantors = signal<Guarantor[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.fecthGuarantors();
  }

  fecthGuarantors() {
    this.isFetching.set(true);
    try {
      this.guarantorService.getAllGuarantors().subscribe({
        next: (data) => {
          this.isFetching.set(false);
          console.log(data);
          this.guarantors.set(data);
        },
        error: (error) => {
          this.isFetching.set(false);
          this.hasError.set(true);
          this.showToastMessage('error', 'Aucun garants trouvés');
          console.log(error);
        }
      })
    } catch (error) {
      this.isFetching.set(false);
      this.hasError.set(true);
      this.showToastMessage('error', 'Une erreur est survenue lors de la récupération des garants');
      console.log(error);
    }
  }

  delete(id: number) {
    this.isLoading.set(true);

    try {
      this.guarantorService.deleteGuarantor(id).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.hasError.set(true);
          this.showToastMessage('success', 'Garant supprimé avec succès');
          this.fecthGuarantors();
          this.hasError.set(false);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.hasError.set(true);
          console.log(error);
          this.showToastMessage('error', 'Une erreur est survenue lors de la suppression du garant');
        }
      })
    } catch (error) {
      this.isLoading.set(false);
      this.hasError.set(true);
      this.showToastMessage('error', 'Une erreur est survenue lors de la suppression du garant');
    }
  }

  navigateToGuarantorDetails() {
    this.router.navigate(['/guarantor/details']);
  }

  showToastMessage(type: string, message: string) {
    this.state.set(type);
    this.message.set(message);
  }
}
