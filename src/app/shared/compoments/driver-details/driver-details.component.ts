import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { SupplierResponse } from '../../models/supplier.models';
import { SupplierService } from '../../../services/Supplier/supplier.service';

import { NavbarComponent } from '../navbar/navbar.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { UserQuizFormComponent } from '../user-quiz-form/user-quiz-form.component';
import { DriverValidationComponent } from '../driver-validation/driver-validation.component';
import { DriverVerificationComponent } from '../driver-verification/driver-verification.component';

@Component({
  selector: 'app-driver-details',
  imports: [CommonModule, NavbarComponent, FileUploaderComponent, UserQuizFormComponent, DriverValidationComponent, DriverVerificationComponent],
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
  driverId = signal<number>(0);
  imagePreview = signal<string>('');
  showFileUploader = signal<boolean>(false);
  isQuizVisible = signal<boolean>(false);
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

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Validate file is an image
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image valide');
        return;
      }

      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview.set(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Update the form control with the file
      this.picture = file;
    }
  }

  onUpload() {
    try {
      this.supplierService.uploadProfilePicture(this.driverId(), this.picture).subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error.message)
      })
    } catch (error) {
      console.log(error);
    }
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
