import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Quiz, QuizResponse } from '../../models/quiz.models';
import { QuizService } from '../../../services/Quiz/quiz.service';

@Component({
  standalone: true,
  selector: 'app-quiz-list',
  imports: [CommonModule],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss'
})
export class QuizListComponent implements OnInit {
  private router = inject(Router);
  private quizService = inject(QuizService);

  isLoading = signal<boolean>(false);
  quizzes = signal<QuizResponse[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.fetchQuizzes();
  }

  fetchQuizzes(): void {

    try {
      this.quizService.getQuizzes().subscribe({
        next: (quizzes: QuizResponse[]) => {
          this.quizzes.set(quizzes);
          console.log('Fetched quizzes:', this.quizzes());
        },
        error: (error: any) => {
          console.log('Error fetching quizzes:', error);
        }
      });
    } catch (error) {
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
