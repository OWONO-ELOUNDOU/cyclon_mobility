import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';

import { UserService } from '../../../services/User/user.service';

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

  private router = inject(Router);
  private userService = inject(UserService);

  hasCNI = signal<string>('');
  hasLicence = signal<string>('');
  isLoading = signal<boolean>(false);

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    adress: new FormControl('', Validators.required),
    password: new FormControl(''),
    cniNumber: new FormControl(''),
    cniExpireDate: new FormControl(''),
    driverLicenceExpireDate: new FormControl(''),
    isActive: new FormControl(true),
    isDriverValidated: new FormControl(false),
    profilePicture: new FormControl(''),
  });

  constructor() { }

  get f() {
    return this.userForm.controls;
  }

  checkCNI(choice: string) {
    this.hasCNI.set(choice);
  }

  checkLicence(choice: string) {
    this.hasLicence.set(choice);
  }

  onSubmit() {
    if (this.userForm.valid) {
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
