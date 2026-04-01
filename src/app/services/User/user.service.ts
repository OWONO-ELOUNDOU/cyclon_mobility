import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, UserResponse } from '../../shared/models/user.models';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../shared/models/Auth.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  private readonly endpoint = '/users';
  private currentUser: LoginResponse = JSON.parse(localStorage.getItem('currentUser') || '{}');

  constructor() { }

  createUser(request: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${environment.apiUrl}${this.endpoint}`, request, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    })
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}${this.endpoint}/${this.currentUser.user.id}`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    })
  }

  deleteUser() {
    return this.http.delete(`${environment.apiUrl}${this.endpoint}/${this.currentUser.user.id}`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    })
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}${this.endpoint}`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    })
  }

  
}
