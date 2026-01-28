import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { NavbarComponent } from '../navbar/navbar.component';
import { ToastMessageComponent } from '../toast-message/toast-message.component';

import { GuarantorService } from '../../../services/Guarantor/guarantor.service';

@Component({
  selector: 'app-guarantor-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent, ToastMessageComponent],
  templateUrl: './guarantor-form.component.html',
  styleUrl: './guarantor-form.component.scss'
})
export class GuarantorFormComponent implements OnInit {
  // Injection des services
  private router = inject(Router);
  private guarantorService = inject(GuarantorService);

  // Déclaration de variables
  driverId = signal<number>(0);
  title = signal<string>('Garant');
  state = signal<string>('error');
  errorMessage = signal<string>('');
  isLoading = signal<boolean>(false);
  hasMessage = signal<boolean>(false);
  imagePreview = signal<string | null>(null);

  // Définition du formulaire
  guarantorForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    cniNumber: new FormControl('', Validators.required),
    cniExpireDate: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    profilePicture: new FormControl(''),
    guarandAffiliation: new FormControl('', Validators.required),
    driver_id: new FormControl(0)
  });

  constructor() { }

  ngOnInit(): void {
    this.driverId.set(localStorage.getItem('driverId') ? Number(localStorage.getItem('driverId')) : 0);
  }

  get f() {
    return this.guarantorForm.controls;
  }

  onSubmit() {
    if (this.guarantorForm.invalid) {
      this.markFormGroupTouched(this.guarantorForm);
      return;
    }

    this.guarantorForm.patchValue({
      driver_id: this.driverId()
    });
    console.log(this.guarantorForm.value);
    this.isLoading.set(true);

    try {
      this.guarantorService.createGuarantor(this.guarantorForm.value).subscribe({
        next: (response) => {
          this.isLoading.set(true);
          this.hasMessage.set(true);
          this.showToastMessage('success', 'Garant enregistré avec succès');
          console.log('Guarantor created successfully:', response);
        },
        error: (error) => {
          this.isLoading.set(true);
          this.hasMessage.set(true);
          this.showToastMessage('error', 'Erreur lors enregistrement du garant');
          console.error('Error creating guarantor:', error);
        }
      });
    } catch (error) {
      this.isLoading.set(true);
      this.hasMessage.set(true);
      this.showToastMessage('error', 'Une erreur est survenue');
    }
    
  }

  onCancel() {
    this.guarantorForm.reset();
    this.navigateTo('suppliers');
  }

  showToastMessage(type: string, details: string) {
    this.state.set(type);
    this.errorMessage.set(details);
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
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
      this.guarantorForm.patchValue({
        profilePicture: file
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
