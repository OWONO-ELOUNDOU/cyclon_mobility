import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CarType } from '../../shared/models/car-types-models';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../shared/models/Auth.models';

@Injectable({
  providedIn: 'root'
})
export class CarTypesService {
  private readonly endpoint = '/car-types/';
  private http = inject(HttpClient);
  private currentUser: LoginResponse = JSON.parse(localStorage.getItem('currentUser') || '{}');
  private httpOptions = {
    'Authorization': `Bearer ${this.currentUser.access_token}`
  }

  constructor() { }

  /**
   * Gestion des types de véhicules
   */
  addNewtype(formData: Partial<CarType>): Observable<CarType> {
    return this.http.post<CarType>(`${environment.apiUrl}${this.endpoint}`, formData, { headers: this.httpOptions })
  }

  getAllTypes(): Observable<CarType[]> {
    return this.http.get<CarType[]>(`${environment.apiUrl}${this.endpoint}`, { headers: this.httpOptions })
  }

  getCarTypesById(id: number): Observable<CarType> {
    return this.http.get<CarType>(`${environment.apiUrl}${this.endpoint}${id}`, { headers: this.httpOptions })
  }

  getCarTypesByLabel(label: string): Observable<CarType> {
    return this.http.get<CarType>(`${environment.apiUrl}${this.endpoint}label/${label}`, { headers: this.httpOptions })
  }

  getCarTypesCount(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${this.endpoint}count`, { headers: this.httpOptions })
  }

  updateCarType(id: any, formData: Partial<CarType>): Observable<CarType> {
    return this.http.put<CarType>(`${environment.apiUrl}${this.endpoint}${id}`, formData, { headers: this.httpOptions })
  }

  deleteCarType(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${this.endpoint}${id}`, { headers: this.httpOptions })
  }
}
