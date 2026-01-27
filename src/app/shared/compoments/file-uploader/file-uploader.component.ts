import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

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
    categoryFile: new FormControl(''),
    file: new FormControl('', Validators.required)
  }));
  

  driverId = input<number>(0);
  isLoading = signal<boolean>(false);
  hasCategory = input<boolean>(false);
  profilePicture = signal<File | null>(null);
  selectedImage = signal<string | null>(null);
  uploadMessage = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  constructor() {}

  onImageSelected(event: Event): void {
    const image = (event.target as HTMLInputElement).files?.[0];
    if (image) {
      // Validate file is an image
      if (!image.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image valide');
        return;
      }

      // Update the form control with the file
      this.profilePicture.set(image);
    }
  }

  onUpload() {
    console.log(this.driverId());
    this.uploadForm().patchValue({ file: this.profilePicture() });
    console.log(this.uploadForm().value);

    
    try {
      this.uploadService.uploadfile(this.driverId(), this.uploadForm().value).subscribe({
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
