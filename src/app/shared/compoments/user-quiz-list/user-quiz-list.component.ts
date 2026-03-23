import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { userQuiz } from '../../models/quiz.models';
import { QuizService } from '../../../services/Quiz/quiz.service';

import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  standalone: true,
  selector: 'app-user-quiz-list',
  imports: [CommonModule, ToastMessageComponent],
  templateUrl: './user-quiz-list.component.html',
  styleUrl: './user-quiz-list.component.scss'
})
export class UserQuizListComponent implements OnInit {
  private router = inject(Router);
  private quizService = inject(QuizService);

  state = signal<string>('');
  message = signal<string>('');
  hasError = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  isFetching = signal<boolean>(false);
  userQuizzes = signal<userQuiz[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.fetchUserQuizzes();
  }

  fetchUserQuizzes() {
    this.isFetching.set(true);

    try {
      this.quizService.getAllUserQuizzes().subscribe({

        next: (data) => {
          this.isFetching.set(false);
          this.userQuizzes.set(data);
          console.log('Fetched user quizzes:', this.userQuizzes());
        },
        error: (error: any) => {
          this.isFetching.set(false);
          this.hasError.set(true);
          this.showToastMessage('error', 'aucun quiz trouvés');
          console.error('Error fetching user quizzes:', error);
        }
      });
    } catch (error) {
      this.isFetching.set(false);
      this.hasError.set(true);
      console.log(error);
      this.showToastMessage('error', 'Erreur lors du chargement des quiz');
    }
  }

  onDelete(id: number) {
    this.isLoading.set(true);
    try {
      this.quizService.deleteUserQuiz(id).subscribe({
        next: () => window.location.reload(),
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

  navigateToUserQuizDetails(id: number) {
    localStorage.setItem('quizId', id.toString());
    this.router.navigate(['/quiz/details']);
  }

  showToastMessage(type: string, details: string) {
    this.state.set(type);
    this.message.set(details);
  }
}
