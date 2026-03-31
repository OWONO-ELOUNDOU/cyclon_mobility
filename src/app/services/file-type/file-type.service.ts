import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileType, FileTypeResponse } from '../../shared/models/file-type.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileTypeService {
  private apiUrl = `${environment.apiUrl}/file-types`; 

  constructor(private http: HttpClient) {}

  getAllFileTypes(): Observable<FileType[]> {
    return this.http.get<FileType[]>(this.apiUrl);
  }

  createFileType(fileType: Partial<FileType>): Observable<FileType> {
    return this.http.post<FileType>(this.apiUrl, fileType);
  }

  updateFileType(id: number, fileType: Partial<FileType>): Observable<FileType> {
    return this.http.put<FileType>(`${this.apiUrl}/${id}`, fileType);
  }

  deleteFileType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}