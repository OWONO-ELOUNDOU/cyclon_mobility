import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { FileRequest } from '../../models/file-type.models';
import { FileUploadService } from '../../../services/File/file-upload.service';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
})
export class FileUploaderComponent {
  private uploadService = inject(FileUploadService);

  categories = [
    { id: 'license', label: 'Permis de conduire' },
    { id: 'insurance', label: 'Assurance' },
    { id: 'registration', label: 'Immatriculation' },
    { id: 'inspection', label: 'Inspection'},
    { id: 'profile', label: 'Photo de profil'}
  ];

  uploadForm = signal<FormGroup>(new FormGroup({
    categoryFile: new FormControl('', Validators.required)
  }));
  

  driverId = input<number>(0);
  isLoading = signal<boolean>(false);
  hasCategory = input<boolean>(false);
  selectedFile!: File;
  selectedImage = signal<File | null>(null);
  uploadMessage = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  constructor() {}

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
    try {
      this.uploadService.uploadfile(this.driverId(), uploadRequest).subscribe({
        next: (response) => {
          console.log(response);
          this.showMessage('success', 'Fichier téléchargé avec succès');
          this.resetForm();
        },
        error: (err) => {
          console.log(err);
        }
      });
    } catch (error) {
      console.log(error);
    }
    
  }

  /**
   * Show message notification
   */
  private showMessage(type: 'success' | 'error', text: string): void {
    this.uploadMessage.set({ type, text });
    setTimeout(() => this.uploadMessage.set(null), 4000);
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
