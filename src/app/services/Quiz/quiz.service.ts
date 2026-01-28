import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Quiz, QuizResponse, userQuiz } from '../../shared/models/quiz.models';
import { LoginResponse } from '../../shared/models/Auth.models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly apiUrl = environment.apiUrl + '/quiz';
  private currentUser: LoginResponse = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null;

  private headerOptions = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${this.currentUser.access_token}`
  }

  private http = inject(HttpClient);

  constructor() { }

  createQuiz(quiz: Quiz): Observable<QuizResponse> {
    return this.http.post<QuizResponse>(this.apiUrl, quiz, { headers: this.headerOptions });
  }

  // Récupérer la liste des quiz
  getQuizzes(): Observable<QuizResponse[]> {
    return this.http.get<QuizResponse[]>(this.apiUrl, { headers: this.headerOptions });
  }

  // Récupérer un quiz par son ID
  getQuizById(id: number): Observable<QuizResponse> {
    return this.http.get<QuizResponse>(`${this.apiUrl}/${id}`, { headers: this.headerOptions });
  }

  // Mettre à jour un quiz par son ID
  updateQuiz(id: number, quiz: Quiz): Observable<QuizResponse> {
    return this.http.put<QuizResponse>(`${this.apiUrl}/${id}`, quiz, { headers: this.headerOptions });
  }

  // Supprimer un quiz par son ID
  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headerOptions });
  }

  // Créer un quiz utilisateur
  createUserQuiz(userQuiz: userQuiz): Observable<userQuiz> {
    return this.http.post<userQuiz>(`${this.apiUrl}-user`, userQuiz, { headers: this.headerOptions });
  }

  // Supprimer un quiz utilisateur
  deleteUserQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headerOptions })
  }

  // Récupérer les quiz créés par un utilisateur spécifique
  getQuizzesByUser(userId: number): Observable<userQuiz[]> {
    return this.http.get<userQuiz[]>(`${this.apiUrl}-user/${userId}`, { headers: this.headerOptions });
  }

  // Récupérer tous les quiz des utilisateurs
  getAllUserQuizzes(): Observable<userQuiz[]> {
    return this.http.get<userQuiz[]>(`${this.apiUrl}-user`, { headers: this.headerOptions });
  }
}
