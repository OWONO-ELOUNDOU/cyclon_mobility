import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { userQuiz } from '../../models/quiz.models';
import { QuizService } from '../../../services/Quiz/quiz.service';

import { NavbarComponent } from '../navbar/navbar.component';
import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  selector: 'app-quiz-details',
  imports: [CommonModule, NavbarComponent, ToastMessageComponent],
  templateUrl: './quiz-details.component.html',
  styleUrl: './quiz-details.component.scss'
})
export class QuizDetailsComponent implements OnInit {
  private router = inject(Router);
  private quizService = inject(QuizService);

  state = signal<string>('');
  message = signal<string>('');
  isLoading = signal<boolean>(false);
  hasMessage = signal<boolean>(false);
  item = signal<userQuiz | null>(null);

  constructor() { }

  ngOnInit(): void {
    const id = localStorage.getItem('quizId');
    if (id) {
      this.loadQuizDetails(+id);
    } else {
      console.error('No quiz ID found in localStorage');
    }
  }

  loadQuizDetails(quizId: number) {
    this.isLoading.set(true);

    try {
      this.quizService.getUserQuizById(quizId).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          this.item.set(response);
          console.log('Quiz details loaded successfully:', response);
        },
        error: (error) => {
          this.isLoading.set(false);
          console.error('Error fetching quiz details:', error);
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  navigateTo(id: number | string, path: string) {
    localStorage.setItem('quizId', id.toString());
    this.router.navigate([`/${path}`]);
  }
}
