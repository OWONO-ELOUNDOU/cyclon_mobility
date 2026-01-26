import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileType, FileTypeResponse } from '../../shared/models/file-type.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileTypeService {
  private apiUrl = `${environment.apiUrl}/file-types`; 

  constructor(private http: HttpClient) {}

  getAllFileTypes(): Observable<FileTypeResponse[]> {
    return this.http.get<FileTypeResponse[]>(this.apiUrl);
  }

  createFileType(fileType: FileType): Observable<FileTypeResponse> {
    return this.http.post<FileTypeResponse>(this.apiUrl, fileType);
  }

  updateFileType(id: number, fileType: FileType): Observable<FileTypeResponse> {
    return this.http.put<FileTypeResponse>(`${this.apiUrl}/${id}`, fileType);
  }

  deleteFileType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}