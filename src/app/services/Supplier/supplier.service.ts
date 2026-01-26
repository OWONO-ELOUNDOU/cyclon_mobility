import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { environment } from '../../environments/environment';
import { LoginResponse, UserLoginResponse } from '../../shared/models/Auth.models';
import { Supplier, SupplierResponse } from '../../shared/models/supplier.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private readonly endpoint = '/driver';
  private currentUser: LoginResponse = JSON.parse(localStorage.getItem('currentUser') || '{}');

  private http = inject(HttpClient);

  constructor() { }

  createDriver(request: Supplier) {
    return this.http.post(`${environment.apiUrl}${this.endpoint}`, request, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    })
  }

  getAllDrivers(): Observable<SupplierResponse[]> {
    return this.http.get<SupplierResponse[]>(`${environment.apiUrl}${this.endpoint}`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    })
  }

  getDriverDetails(id: number): Observable<SupplierResponse> {
    return this.http.get<SupplierResponse>(`${environment.apiUrl}${this.endpoint}/${id}`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    })
  }
}
