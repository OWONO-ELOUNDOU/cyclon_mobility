import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { NavbarComponent } from '../../shared/compoments/navbar/navbar.component';
import { QuizListComponent } from '../../shared/compoments/quiz-list/quiz-list.component';
import { QuizFormComponent } from '../../shared/compoments/quiz-form/quiz-form.component';
import { UserQuizListComponent } from '../../shared/compoments/user-quiz-list/user-quiz-list.component';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, NavbarComponent, QuizListComponent, QuizFormComponent, UserQuizListComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent implements OnInit {
  title = signal<string>('Page de Quiz');

  isFormVisible = signal<boolean>(false);

  constructor() {}

  ngOnInit(): void {
    
  }

  toggleVisibility() {
    this.isFormVisible.set(!this.isFormVisible());
  }
}
