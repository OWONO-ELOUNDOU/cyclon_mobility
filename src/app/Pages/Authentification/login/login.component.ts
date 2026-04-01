import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';

import { AuthenticationService } from '../../../services/Authentication/authentication.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthenticationService);

  isLoading = signal<boolean>(false);

  loginForm: FormGroup = new FormGroup({
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor() { }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

      this.isLoading.set(true);
      try {
        this.authService.signIn(this.loginForm.value).subscribe({
          next: (data) => {
            this.isLoading.set(true);
            console.log(data);
            localStorage.setItem('currentUser', JSON.stringify(data));
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.isLoading.set(false);
            console.log(error.message);
          }
        })
      } catch (error) {
        this.isLoading.set(false);
        console.log(error);
      }
    } else {
      this.markFormGroupTouched(this.loginForm);
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
