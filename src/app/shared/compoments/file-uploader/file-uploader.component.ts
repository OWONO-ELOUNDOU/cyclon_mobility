import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { FileRequest } from '../../models/file-type.models';
import { FileUploadService } from '../../../services/File/file-upload.service';

import { ToastMessageComponent } from '../toast-message/toast-message.component';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastMessageComponent],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
})
export class FileUploaderComponent implements OnInit {
  private uploadService = inject(FileUploadService);

  categories: any[] = [];

  uploadForm = signal<FormGroup>(new FormGroup({
    categoryFile: new FormControl('', Validators.required)
  }));
  
  selectedFile!: File;
  state = signal<string>('');
  driverId = input<number>(0);
  message = signal<string>('');
  isLoading = signal<boolean>(false);
  hasMessage = signal<boolean>(false);
  hasCategory = input<boolean>(false);
  selectedImage = signal<File | null>(null);
  uploadMessage = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  constructor() {}

  ngOnInit(): void {
    this.categories = [
      { id: 'license', label: 'Permis de conduire' },
      { id: 'insurance', label: 'Assurance' },
      { id: 'registration', label: 'Immatriculation' },
      { id: 'inspection', label: 'Inspection'},
      { id: 'profile', label: 'Photo de profil'}
    ]
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

      if (!allowedTypes.includes(file.type)) {
        this.selectedImage.set(null);
        input.value = '';
      } else {
        this.selectedImage.set(file);
      }
    }
    
  }


  onUpload() {
    console.log(this.driverId());
    const formValue = this.uploadForm().getRawValue();
    const uploadRequest: FileRequest = { ...formValue, image: this.selectedImage() };
    this.isLoading.set(true);
    
    try {
      this.uploadService.uploadfile(this.driverId(), uploadRequest).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          console.log(response);
          this.showMessage('success', 'Fichier téléchargé avec succès');
          this.resetForm();
          window.location.reload();
        },
        error: (err) => {
          this.isLoading.set(false);
          console.log(err);
          this.showMessage('error', err.message);
        }
      });
    } catch (error) {
      this.isLoading.set(false);
      console.log(error);
      this.showMessage('error', 'Une erreur est survenue lors du téléchargement du fichier');
    }
    
  }

  /**
   * Show message notification
   */
  private showMessage(type: 'success' | 'error' | 'info', details: string): void {
    this.hasMessage.set(true);
    this.state.set(type);
    this.message.set(details);
    setTimeout(() => this.hasMessage.set(false), 2000);
  }

  /**
   * Reset form
   */
  resetForm(): void {
    this.uploadForm().reset();
    this.selectedImage.set(null);
    this.uploadMessage.set(null);
  }
}
