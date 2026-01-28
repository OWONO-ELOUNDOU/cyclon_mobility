import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';

import { QuizService } from '../../../services/Quiz/quiz.service';

import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  selector: 'app-quiz-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastMessageComponent],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.scss'
})
export class QuizFormComponent {
  private quizService = inject(QuizService);

  isLoading = signal<boolean>(false);
  state = signal<string>('');
  message = signal<string>('');
  hasMessage = signal<boolean>(false);
  quizForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    totalAvrage: new FormControl(0, [Validators.required, Validators.min(0)]),
    minAvrage: new FormControl(0, [Validators.required, Validators.min(0)]),
    maxAvrage: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  constructor() { }

  get f() {
    return this.quizForm.controls;
  }

  onSubmit() {
    if (this.quizForm.valid) {
      console.log(this.quizForm.value);
      this.isLoading.set(true);
      try {
        this.quizService.createQuiz(this.quizForm.value).subscribe({
          next: (response) => {
            this.isLoading.set(false);
            this.hasMessage.set(true);
            this.showToastMessage('success', 'Le quiz a été crée');
            window.location.reload();
          },
          error: (error) => {
            this.isLoading.set(false);
            this.hasMessage.set(true);
            this.showToastMessage('error', `${error.message}`)
            console.error('Error creating quiz:', error);
          }
        });
      } catch (error) {
        this.isLoading.set(false);
        this.hasMessage.set(true);
        this.showToastMessage('error', 'UNe erreur est survenue')
        console.log(error)
      }
        
    } else {
      this.markFormGroupTouched(this.quizForm);
    }
  }

  showToastMessage(type: string, details: string) {
    this.state.set(type);
    this.message.set(details);
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
