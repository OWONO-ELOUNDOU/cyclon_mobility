import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { NavbarComponent } from '../navbar/navbar.component';

import { GuarantorService } from '../../../services/Guarantor/guarantor.service';

@Component({
  selector: 'app-guarantor-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent],
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
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

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
    
    try {
      this.guarantorService.createGuarantor(this.guarantorForm.value).subscribe({
        next: (response) => {
          console.log('Guarantor created successfully:', response);
        },
        error: (error) => {
          console.error('Error creating guarantor:', error);
          this.errorMessage.set('Failed to create guarantor. Please try again.');
        }
      });
    } catch (error) {
      this.errorMessage.set('An unexpected error occurred. Please try again.');
    }
    
  }

  onCancel() {
    this.guarantorForm.reset();
    this.navigateTo('suppliers');
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
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
