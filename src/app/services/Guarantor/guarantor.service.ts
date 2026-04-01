import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guarantor, GuarantorProfilePictureUpdateRequest, GuarantorResponse } from '../../shared/models/guarantor.models';
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
  getGuarantorById(id: number): Observable<Guarantor> {
    return this.http.get<Guarantor>(`${this.apiUrl}/${id}`, { headers: this.headerOptions });
  }

  // Mise à jour des informations d'un garant
  updateGuarantor(id: number, request: Guarantor): Observable<GuarantorResponse> {
    return this.http.put<GuarantorResponse>(`${this.apiUrl}/${id}`, request, { headers: this.headerOptions });
  }

  // Upload de la photo de profile
  uploadProfilePicture(id: number, fileData: GuarantorProfilePictureUpdateRequest): Observable<string> {
    const formData = this.toFormData(fileData);
    return this.http.post<string>(`${this.apiUrl}/${id}/profile-picture`, formData, {
      headers: {
        'Authorization': `Bearer ${this.currentUser.access_token}`
      }
    });
  }

  // Suppression d'un garant
  deleteGuarantor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headerOptions });
  }

  // Récupération de la liste de tous les garants
  getAllGuarantors(): Observable<Guarantor[]> {
    return this.http.get<Guarantor[]>(this.apiUrl, { headers: this.headerOptions });
  }

  /**
   * Convertit un objet en FormData.
   * Gère les fichiers et sérialise les objets imbriqués en JSON.
   */
  private toFormData(data: any): FormData {
    const formData = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];
        if (value !== null && value !== undefined) {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === 'object') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      }
    }
    return formData;
  }
}
