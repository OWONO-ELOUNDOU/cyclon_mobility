import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guarantor, GuarantorResponse } from '../../shared/models/guarantor.models';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../../shared/models/Auth.models';

@Injectable({
  providedIn: 'root'
})
export class GuarantorService {
  private readonly apiUrl = environment.apiUrl + '/guarantor';
  private currentUser: LoginResponse = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null;

  private http = inject(HttpClient);

  private headerOptions = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${this.currentUser.access_token}`
  }

  constructor() { }

  // Création d'un nouveau garant
  createGuarantor(request: Guarantor): Observable<GuarantorResponse> {
    return this.http.post<GuarantorResponse>(this.apiUrl, request, { headers: this.headerOptions });
  }

  // Récupération des informations d'un garant par son ID
  getGuarantorById(id: number): Observable<GuarantorResponse> {
    return this.http.get<GuarantorResponse>(`${this.apiUrl}/${id}`, { headers: this.headerOptions });
  }

  // Mise à jour des informations d'un garant
  updateGuarantor(id: number, request: Guarantor): Observable<GuarantorResponse> {
    return this.http.put<GuarantorResponse>(`${this.apiUrl}/${id}`, request, { headers: this.headerOptions });
  }

  // Suppression d'un garant
  deleteGuarantor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headerOptions });
  }

  // Récupération de la liste de tous les garants
  getAllGuarantors(): Observable<GuarantorResponse[]> {
    return this.http.get<GuarantorResponse[]>(this.apiUrl, { headers: this.headerOptions });
  }
}
