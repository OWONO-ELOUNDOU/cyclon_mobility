import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { DriverProfilePictureUpdateRequest, SupplierResponse } from '../../models/supplier.models';
import { SupplierService } from '../../../services/Supplier/supplier.service';

import { NavbarComponent } from '../navbar/navbar.component';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { UserQuizFormComponent } from '../user-quiz-form/user-quiz-form.component';
import { DriverValidationComponent } from '../driver-validation/driver-validation.component';
import { DriverVerificationComponent } from '../driver-verification/driver-verification.component';

@Component({
  selector: 'app-driver-details',
  imports: [CommonModule, NavbarComponent, ToastMessageComponent, FileUploaderComponent, UserQuizFormComponent, DriverValidationComponent, DriverVerificationComponent],
  templateUrl: './driver-details.component.html',
  styleUrl: './driver-details.component.scss'
})
export class DriverDetailsComponent implements OnInit {
  title = signal<string>('Détails du driver');

  // Injection des services
  private router = inject(Router);
  private supplierService = inject(SupplierService);

  // Déclaration des variables
  picture!: File;
  state = signal<string>('');
  message = signal<string>('');
  driverId = signal<number>(0);
  imagePreview = signal<string>('');
  isLoading = signal<boolean>(false);
  hasMessage = signal<boolean>(false);
  isDeleting = signal<boolean>(false);
  isUploading = signal<boolean>(false);
  isQuizVisible = signal<boolean>(false);
  selectedImage = signal<File | null>(null);
  showFileUploader = signal<boolean>(false);
  isGuarantorVisible = signal<boolean>(false);
  driver = signal<SupplierResponse | null>(null);

  constructor() { }

  ngOnInit(): void {
    this.driverId.set(localStorage.getItem('driverId') ? Number(localStorage.getItem('driverId')) : 0);
    this.fetchDriverDetails();
  }

  fetchDriverDetails(): void {
    this.isLoading.set(true);
    try {
      this.supplierService.getDriverDetails(this.driverId()).subscribe({
        next: (response: SupplierResponse) => {
          this.isLoading.set(false);
          this.driver.set(response);
          console.log(this.driver());
        },
        error: (error) => {
          this.isLoading.set(false);
          console.log(error.message);
        }
      });
    } catch (error) {
      this.isLoading.set(false);
      console.log(error);
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
    const fileRequest: DriverProfilePictureUpdateRequest = { file: this.selectedImage() as File };
    this.isUploading.set(true);

    try {
      this.supplierService.uploadProfilePicture(this.driverId(), fileRequest).subscribe({
        next: (response) => {
          this.isUploading.set(false);
          console.log(response);
          this.showMessage('success', 'Image téléchargée avec succès');
          this.fetchDriverDetails();
        },
        error: (error) => {
          this.isUploading.set(false);
          this.showMessage('error', 'Erreur lors du téléchargement de l\'image');
          console.log(error.message);
        }
      })
    } catch (error) {
      console.log(error);
      this.showMessage('error', 'Une erreur est survenue lors du téléchargement de l\'image');
    }
  }

  onDelete(id: number) {
    this.isDeleting.set(true);

    try {
      this.supplierService.deleteDriver(id).subscribe({
        next: () => {
          this.isDeleting.set(false);
          this.showMessage('success', 'Driver supprimé avec succès');
        },
        error: (error) => {
          this.isDeleting.set(false);
          this.showMessage('error', 'Erreur lors de la suppression du driver');
          console.log(error.message);
        }
      });

    } catch (error) {
      this.isDeleting.set(false);
      console.log(error);
    }
  }

  showMessage(type: string, details: string) {
    this.state.set(type);
    this.message.set(details);
    this.hasMessage.set(true);
    setTimeout(() => {
      this.hasMessage.set(false);
    }, 3000);
  }

  toggleQuizVisibility() {
    this.isQuizVisible.update(v => !v);
  }

  toggleGuarantorVisibility() {
    this.isGuarantorVisible.update(v => !v);
  }

  toggleUploaderVisibility() {
    this.showFileUploader.update(v => !v);
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
