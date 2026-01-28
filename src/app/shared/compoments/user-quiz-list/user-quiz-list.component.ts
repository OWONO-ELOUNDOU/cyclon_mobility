import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { userQuiz } from '../../models/quiz.models';
import { QuizService } from '../../../services/Quiz/quiz.service';

@Component({
  standalone: true,
  selector: 'app-user-quiz-list',
  imports: [CommonModule],
  templateUrl: './user-quiz-list.component.html',
  styleUrl: './user-quiz-list.component.scss'
})
export class UserQuizListComponent implements OnInit {
  private quizService = inject(QuizService);

  isLoading = signal<boolean>(false);
  userQuizzes = signal<userQuiz[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.fetchUserQuizzes();
  }

  fetchUserQuizzes() {
    try {
      this.quizService.getAllUserQuizzes().subscribe({
        next: (data) => {
          this.userQuizzes.set(data);
          console.log('Fetched user quizzes:', this.userQuizzes());
        },
        error: (error: any) => {
          console.error('Error fetching user quizzes:', error);
        }
      });
    } catch (error) {
      console.log(error);
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
}
