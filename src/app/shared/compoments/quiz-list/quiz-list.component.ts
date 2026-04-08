import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Quiz, QuizResponse } from '../../models/quiz.models';
import { QuizService } from '../../../services/Quiz/quiz.service';

import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  standalone: true,
  selector: 'app-quiz-list',
  imports: [CommonModule, ToastMessageComponent],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss'
})
export class QuizListComponent implements OnInit {
  private router = inject(Router);
  private quizService = inject(QuizService);

  message = signal<string>('');
  isLoading = signal<boolean>(false);
  isFetching = signal<boolean>(false);
  hasMessage = signal<boolean>(false);
  quizzes = signal<QuizResponse[]>([]);
  state = signal<'success' | 'info' | 'error'>('success');

  constructor() { }

  ngOnInit(): void {
    this.fetchQuizzes();
  }

  fetchQuizzes(): void {
    this.isFetching.set(true);

    try {
      this.quizService.getQuizzes().subscribe({
        next: (quizzes: QuizResponse[]) => {
          this.isFetching.set(false);
          this.quizzes.set(quizzes);
          console.log('Fetched quizzes:', this.quizzes());
        },
        error: (error: any) => {
          this.isFetching.set(false);
          console.log('Error fetching quizzes:', error);
        }
      });
    } catch (error) {
      this.isFetching.set(false);
      console.log('Unexpected error fetching quizzes:', error);
    }
  }

  onDelete(id: number) {
    this.isLoading.set(true);
    try {
      this.quizService.deleteQuiz(id).subscribe({
        next: () => {
          window.location.reload()
        },
        error: (error) => {
          alert('Erreur lors de la suppression du quiz');
          this.isLoading.set(false);
        }
      })
    } catch (error) {
      alert('une erreur est survenue');
      this.isLoading.set(false);
    }
  }

  showMessage(type: 'success' | 'error' | 'info', details: string) {
    this.hasMessage.set(true);
    this.state.set(type);
    this.message.set(details);
    setTimeout(() => { this.hasMessage.set(false); }, 3000);
  }

  showQuizDetails(id: number) {
    this.isLoading.set(true);
    try {
      
    } catch (error) {
      
    }
  }

  navigateToQuizForm(id: number) {
    localStorage.setItem('quizId', id.toString());
    this.router.navigate(['/quiz/form']);
  }
}
