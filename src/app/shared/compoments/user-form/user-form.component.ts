import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';

import { UserService } from '../../../services/User/user.service';
import { generatePassword } from '../../utils/password.utils';

import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  title = signal<string>('utilisateurs');
  imagePreview = signal<string | null>(null);

  private router = inject(Router);
  private userService = inject(UserService);

  isLoading = signal<boolean>(false);

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    adress: new FormControl('', Validators.required),
    password: new FormControl(''),
    cniNumber: new FormControl('', Validators.required),
    cniExpireDate: new FormControl('', Validators.required),
    driverLicenceExpireDate: new FormControl(''),
    isActive: new FormControl(true),
    isDriverValidated: new FormControl(false),
    profilePicture: new FormControl(''),
    ruleId: new FormControl(1)
  });

  constructor() { }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userForm.patchValue({
        password: generatePassword()
      });
      console.log(this.userForm.value);

      this.isLoading.update(v => !v);

      try {
        this.userService.createUser(this.userForm.value).subscribe({
          next: (data) => {
            this.isLoading.update(v => !v);
            console.log(data);
          },
          error: (error) => {
            this.isLoading.update(v => !v);
            console.log(error.message);
          }
        })
      } catch (error) {
        this.isLoading.update(v => !v);
        console.log(error);
      }
    } else {
      this.markFormGroupTouched(this.userForm);
    }
  }

  onCancel() {
    this.router.navigate(['/users']);
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
      this.userForm.patchValue({
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
