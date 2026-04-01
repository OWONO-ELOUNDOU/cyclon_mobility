import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse } from '../../shared/models/Auth.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly endpoint = '/auth';
  private currentUser: LoginResponse = JSON.parse(localStorage.getItem('currentUser') || '{}');

  private http = inject(HttpClient);

  constructor() { }

  signIn(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}${this.endpoint}/login`, request, {
      headers: {
        'Content-type': 'application/json'
      }
    })
  }

  signOut() {
    return this.http.post<LoginResponse>(`${environment.apiUrl}${this.endpoint}/logout`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    })
  }
}
