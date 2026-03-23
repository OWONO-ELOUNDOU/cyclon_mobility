import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { NavbarComponent } from '../../shared/compoments/navbar/navbar.component';
import { QuizListComponent } from '../../shared/compoments/quiz-list/quiz-list.component';
import { UserQuizListComponent } from '../../shared/compoments/user-quiz-list/user-quiz-list.component';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, NavbarComponent, QuizListComponent, UserQuizListComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  title = signal<string>('Page de Quiz');

  isVisible = signal<boolean>(false);

  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    
  }

  navigateToQuizForm() {
    this.router.navigate(['/quiz/form']);
  }
}
