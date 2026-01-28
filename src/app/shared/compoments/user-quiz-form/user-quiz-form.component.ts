import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';

import { QuizResponse } from '../../models/quiz.models';
import { LoginResponse } from '../../models/Auth.models';
import { QuizService } from '../../../services/Quiz/quiz.service';

import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  standalone: true,
  selector: 'app-user-quiz-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastMessageComponent],
  templateUrl: './user-quiz-form.component.html',
  styleUrl: './user-quiz-form.component.scss'
})

export class UserQuizFormComponent implements OnInit {
  private quizService = inject(QuizService);

  state = signal<string>('');
  message = signal<string>('');
  isLoading = signal<boolean>(false);
  hasMessage = signal<boolean>(false);
  quizzes = signal<QuizResponse[]>([]);
  currentUser = signal<LoginResponse | null>(null);
  userQuizForm: FormGroup = new FormGroup({
    userId: new FormControl(0),
    quizId: new FormControl(0, Validators.required),
    note: new FormControl(0, Validators.required),
    file: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
    this.currentUser.set(localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser') || '{}') : null);
    this.userQuizForm.patchValue({
      userId: this.currentUser()?.user.id
    });
    this.fecthQuizzes();
  }

  get f() {
    return this.userQuizForm.controls;
  }

  onImageSelected(event: Event): void {
    const image = (event.target as HTMLInputElement).files?.[0];
    if (image) {
      // Validate file is an image
      if (!image.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image valide');
        return;
      }

      // Update the form control with the file
      this.userQuizForm.patchValue({
        file: image
      });
    }
  }

  fecthQuizzes() {
    try {
      this.quizService.getQuizzes().subscribe({
        next: (quizzes) => {
          console.log('Quizzes fetched successfully:', quizzes);
          this.quizzes.set(quizzes);
        },
        error: (error) => {
          console.error('Error fetching quizzes:', error);
        }
      });
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }

  onSubmit() {
    if (this.userQuizForm.valid) {
      console.log(this.userQuizForm.value);
      this.isLoading.set(true);

      try {
        this.quizService.createUserQuiz(this.userQuizForm.value).subscribe({
          next: (response) => {
            this.isLoading.set(false);
            console.log('User quiz created successfully:', response);
          },
          error: (error) => {
            this.isLoading.set(false);
            this.hasMessage.set(true);
            this.showToastMessage('error', 'Erreur lors de la soumission')
            console.error('Error creating user quiz:', error);
          },
          complete: () => {
            this.isLoading.set(false);
            this.hasMessage.set(true);
            this.showToastMessage('success', 'Le quiz a été soumis')
          }
        });
      } catch (error) {
        this.isLoading.set(false);
        this.hasMessage.set(true);
        this.showToastMessage('error', 'Une erreur est survenue')
        console.error('Unexpected error:', error);
      }

    } else {
      this.markFormGroupTouched(this.userQuizForm);
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
