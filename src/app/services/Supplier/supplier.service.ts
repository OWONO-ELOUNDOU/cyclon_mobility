import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { environment } from '../../environments/environment';
import { LoginResponse } from '../../shared/models/Auth.models';
import { DriverValidationRequest, DriverVerificationRequest, Supplier, SupplierResponse } from '../../shared/models/supplier.models';
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

  uploadProfilePicture(id: number, file: any): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}${this.endpoint}/${id}/profile-picture`, file, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    });
  }

  deleteDriver(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}${this.endpoint}/${id}`, {
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

  verifyDriver(id: number, request: DriverVerificationRequest): Observable<SupplierResponse> {
    return this.http.put<SupplierResponse>(`${environment.apiUrl}${this.endpoint}/${id}/verify`, request, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    });
  }

  validateDriver(id: number, request: DriverValidationRequest): Observable<SupplierResponse> {
    return this.http.put<SupplierResponse>(`${environment.apiUrl}${this.endpoint}/${id}/validate`, request, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    });
  }

  getDriverCount(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.endpoint}/stats/count`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    })
  }

  getPendingValidationCount(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.endpoint}/stats/pending-count`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    })
  }

  getValidatedCount(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.endpoint}/stats/validated-count`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    })
  }
}
