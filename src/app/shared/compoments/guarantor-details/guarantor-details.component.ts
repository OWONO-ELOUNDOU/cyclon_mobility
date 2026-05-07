import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Guarantor, GuarantorProfilePictureUpdateRequest } from '../../models/guarantor.models';
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
  imagePreview = signal<string>('');
  isLoading = signal<boolean>(false);
  hasMessage = signal<boolean>(false);
  isDeleting = signal<boolean>(false);
  isUploading = signal<boolean>(false);
  selectedImage = signal<File | null>(null);
  guarantorDetailsInfo = signal<Guarantor | null>(null);

  constructor() { }

  ngOnInit(): void {
    this.clearSavedGarantorInfo();
    const id = localStorage.getItem('garantId');
    if (id) {
      this.loadGuarantorDetailsInfo(+id);
    } else {
      this.showMessage('error', 'Aucun ID de garant fourni.');
    }
  }

  // Fonction pour supprimer les info du garant sauvegarder
  clearSavedGarantorInfo() {
    localStorage.removeItem('garantorInfo');
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

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (!allowedTypes.includes(file.type)) {
        this.selectedImage.set(null);
        input.value = '';
      } else {
        this.selectedImage.set(file);
        this.imagePreview.set(URL.createObjectURL(file));
      }
    }
    
  }

  onUpload() {
    const fileRequest: GuarantorProfilePictureUpdateRequest = { file: this.selectedImage() as File };
    this.isUploading.set(true);

    try {
      this.guarantorService.uploadProfilePicture(this.guarantorDetailsInfo()?.id!, fileRequest).subscribe({
        next: (response) => {
          this.isUploading.set(false);
          this.showMessage('success', response);
          this.loadGuarantorDetailsInfo(this.guarantorDetailsInfo()?.id!);
        },
        error: (error) => {
          this.isUploading.set(false);
          this.showMessage('error', error.message);
        }
      })
    } catch (error) {
      console.log(error);
      this.showMessage('error', 'Une erreur est survenue lors du téléchargement de l\'image')
    }
  }

  onDelete(id: any) {
    this.isDeleting.set(false);

    try {
      this.guarantorService.deleteGuarantor(id).subscribe({
        next: (response) => {
          this.isDeleting.set(false);
          console.log(response);
          this.showMessage('success', 'La garant a été supprimé');
          this.navigateTo('guarantors');
        },
        error: (err) => {
          this.isDeleting.set(false);
          console.log(err.message);
          this.showMessage('error', 'Erreur lors de la suppression du garant');
        }
      })
    } catch (error) {
      this.isDeleting.set(false);
      console.log(error);
      this.showMessage('error', 'Une erreur est survenue veuillez réessayer plutard');
    }
  }

  showMessage(state: 'success' | 'error' | 'info', message: string) {
    this.hasMessage.set(true);
    this.state.set(state);
    this.message.set(message);
    setTimeout(() => { this.hasMessage.set(false); }, 3000);
  }

  navigateTo(path: string) {
    localStorage.setItem('garantorInfo', JSON.stringify(this.guarantorDetailsInfo()));
    this.router.navigate([`${path}`]);
  }

  navigateToDriverDetails(driverId: number | undefined) {
    if (driverId !== undefined) {
      localStorage.setItem('driverId', driverId.toString());
      this.router.navigate(['/driver/details']);
    }
  }
}
