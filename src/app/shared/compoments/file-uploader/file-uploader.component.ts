import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.scss',
})
export class FileUploaderComponent {
  categories = [
    { id: 'license', label: 'Permis de conduire' },
    { id: 'insurance', label: 'Assurance' },
    { id: 'registration', label: 'Immatriculation' },
    { id: 'inspection', label: 'Inspection'},
    { id: 'profile', label: 'Photo de profil'}
  ];

  uploadForm = signal<FormGroup>(new FormGroup({
    categoryFile: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required)
  }));

  hasCategory = input<boolean>(false);
  selectedImage = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  uploadMessage = signal<{ type: 'success' | 'error'; text: string } | null>(null);

  constructor() {}

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Validate file is an image
      if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image valide');
        return;
      }

      // Update the form control with the file
      this.uploadForm().patchValue({
        file: file
      });
    }
  }

  onUpload() {
    try {
      
    } catch (error) {
      
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
