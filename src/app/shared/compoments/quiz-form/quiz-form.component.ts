import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';

import { QuizService } from '../../../services/Quiz/quiz.service';

import { NavbarComponent } from '../navbar/navbar.component';
import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  selector: 'app-quiz-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastMessageComponent, NavbarComponent],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.scss'
})
export class QuizFormComponent implements OnInit {
  private quizService = inject(QuizService);

  state = signal<string>('');
  message = signal<string>('');
  mode = signal<string>('create');
  isLoading = signal<boolean>(false);
  hasMessage = signal<boolean>(false);
  quiId = signal<number | null>(null);
  quizForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    totalAvrage: new FormControl(0, [Validators.required, Validators.min(0)]),
    minAvrage: new FormControl(0, [Validators.required, Validators.min(0)]),
    maxAvrage: new FormControl(0, [Validators.required, Validators.min(0)]),
  });

  constructor() { }

  ngOnInit(): void {
    this.checkMode();
  }

  get f() {
    return this.quizForm.controls;
  }

  checkMode() {
    this.quiId.set(localStorage.getItem('quizId') ? Number(localStorage.getItem('quizId')) : null);

    if (this.quiId()) {
      this.mode.set('edit');
    } else {
      this.mode.set('create');
    }
  }

  onSubmit() {
    if (this.mode() === 'create') {
      this.createQuiz();
    } else if (this.mode() === 'edit') {
      const quizId = this.quizForm.get('id')?.value;
      this.updateQuiz(quizId);
    }
  }

  createQuiz() {
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
        this.showToastMessage('error', 'Une erreur est survenue')
        console.log(error)
      }
    } else {
      this.markFormGroupTouched(this.quizForm);
    }
  }

  updateQuiz(id: number) {
    if (this.quizForm.valid) {
      console.log(this.quizForm.value);
      this.isLoading.set(true);

      try {
        this.quizService.updateQuiz(id, this.quizForm.value).subscribe({
          next: (response) => {
            this.isLoading.set(false);
            this.hasMessage.set(true);
            this.showToastMessage('success', 'Le quiz a été modifié');
            this.quiId.set(null);
            localStorage.removeItem('quizId');
            this.mode.set('create');
            window.location.reload();
          },
          error: (error) => {
            this.isLoading.set(false);
            this.hasMessage.set(true);
            this.showToastMessage('error', `${error.message}`)
            console.error('Error updating quiz:', error);
          }
        });
      } catch (error) {
        this.isLoading.set(false);
        this.hasMessage.set(true);
        this.showToastMessage('error', 'Une erreur est survenue')
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
