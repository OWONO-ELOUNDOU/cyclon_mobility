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
            console.log('Quiz created successfully:', response);
          },
          error: (error) => {
            this.isLoading.set(false);
            console.error('Error creating quiz:', error);
          }
        });
      } catch (error) {
        this.isLoading.set(false);
        console.log(error)
      }
        
    } else {
      this.markFormGroupTouched(this.quizForm);
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
