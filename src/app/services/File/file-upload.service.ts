import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FileRequest, FileTypeResponse } from '../../shared/models/file-type.models';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = `${environment.apiUrl}/files`; // Adjust based on your API
  private http = inject(HttpClient);

  constructor() { }


  uploadfile(userId: number, fileRequest: FileRequest): Observable<FileTypeResponse> {
    const formData = this.toFormData(fileRequest);

    return this.http.post<FileTypeResponse>(this.apiUrl + `/upload/${userId}`, formData);
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
