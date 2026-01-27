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
    return this.http.post<FileTypeResponse>(this.apiUrl + `/upload/${userId}`, fileRequest, {
      headers: {
        'content-type': 'application/json'
      }
    });
  }
}
