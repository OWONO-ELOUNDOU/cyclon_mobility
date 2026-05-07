import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';

import { ToastMessageComponent } from '../../../shared/compoments/toast-message/toast-message.component';

import { AuthenticationService } from '../../../services/Authentication/authentication.service';

interface LoginError {
  error: string;
  message: string;
  statusCode: number;
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthenticationService);

  message = signal<string>('');
  isLoading = signal<boolean>(false);
  hasMessage = signal<boolean>(false);
  state = signal<'success' | 'info' | 'error'>('success');

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
            this.showMessage('error', `${error.error.error}, ${error.error.message}`);
          }
        })
      } catch (error) {
        this.isLoading.set(false);
        console.log(error);
        this.showMessage('error', `une erreur est survenue`)
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

  showMessage(type: 'success' | 'info' | 'error', details: string) {
    this.hasMessage.set(true);
    this.state.set(type);
    this.message.set(details);
    setTimeout(() => { this.hasMessage.set(false) }, 3000);
  }
}
