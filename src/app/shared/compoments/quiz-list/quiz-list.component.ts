import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  private quizService = inject(QuizService);

  isLoading = signal<boolean>(true);
  quizzes = signal<QuizResponse[]>([]);

  constructor() { }

  ngOnInit(): void {
    this.fetchQuizzes();
  }

  fetchQuizzes(): void {
    this.isLoading.set(true);

    try {
      this.quizService.getQuizzes().subscribe({
        next: (quizzes: QuizResponse[]) => {
          this.quizzes.set(quizzes);
          this.isLoading.set(false);
        },
        error: (error: any) => {
          this.isLoading.set(false);
          console.log('Error fetching quizzes:', error);
        }
      });
    } catch (error) {
      this.isLoading.set(false);
      console.log('Unexpected error fetching quizzes:', error);
    }
  }
}
