import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';

import { FileType, FileTypeResponse } from '../../shared/models/file-type.models';
import { FileTypeService } from '../../services/file-type/file-type.service';

import { NavbarComponent } from '../../shared/compoments/navbar/navbar.component';
import { ToastMessageComponent } from '../../shared/compoments/toast-message/toast-message.component';

@Component({
  selector: 'app-file-types',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToolbarModule,
    NavbarComponent,
    ToastMessageComponent
  ],
  templateUrl: './file-types.component.html',
  styleUrl: './file-types.component.scss'
})
export class FileTypesComponent implements OnInit {
  private fileTypeService = inject(FileTypeService);

  fileTitle = '';
  fileTypes: FileType[] = [];
  state = signal<string>('');
  message = signal<string>('');
  isNew = signal<boolean>(false);
  displayDialog = signal<boolean>(false);
  fileType = signal<Partial<FileType> | null>(null)
  isLoading = signal<boolean>(false);
  isDeleting = signal<boolean>(false);
  isFetching = signal<boolean>(false);
  hasMessage = signal<boolean>(false);

  ngOnInit(): void {
    this.loadFileTypes();
  }

  loadFileTypes(): void {
    this.fileTypeService.getAllFileTypes().subscribe({
      next: (data) => {
        this.fileTypes = data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  addNew() {
    this.isNew.set(true);
    this.fileType.set({});
    this.displayDialog.set(true);
  }

  editFileType(fileType: FileType): void {
    this.isNew.set(false);
    this.fileType.set({ ...fileType });
    this.displayDialog.set(true);
  }

  viewFileType(file: FileType) {
    this.fileType.set(file);
    this.displayDialog.set(true);
  }

  deleteFileType(fileType: FileType): void {
    this.isDeleting.set(true);

    try {
      this.fileTypeService.deleteFileType(fileType.id).subscribe({
        next: (response) => {
          this.isDeleting.set(false);
          console.log(response);
          this.showMessage('success', `Le type de fichier a été supprimé ${response}`);
        },
        error: (error) => {
          this.isDeleting.set(false);
          this.showMessage('error', `Une erreur est survenue lors de la suppression ${error.message}`);
        }
      })
    } catch (error) {
      this.isDeleting.set(false);
      console.log(error)
      this.showMessage('error', `Une erreur est survenue lors de la suppression ${error}`);
    }
  }

  /**
   * Fonction pour gérer la soumission d u formulaire, en fonction de l'état (création ou mise à jour)
   */
  saveFileType(): void {
    if (this.fileTitle === '') {
      this.showMessage('error', 'Le titre du fichier est requis');
      return;
    }
    console.log(this.fileTitle);
    const payload: Partial<FileType> = { title: this.fileTitle };

    this.isLoading.set(true);
    const operation = this.isNew()
      ? this.fileTypeService.createFileType(payload)
      : this.fileTypeService.updateFileType(this.fileType()?.id!, payload);

    operation.subscribe({
      next: (response) => {
        this.isLoading.set(true);
        this.showMessage('success', 'Nouveau type créé');
        this.loadFileTypes();
        this.displayDialog.set(false);
      },
      error: (err: any) => {
        this.isLoading.set(true);
        console.error(err);
        this.showMessage('error', `Erreur lors de la création du type de fichier ${err.message}`)
      }
    });
  }

  // Affichage de message d'erreur
  showMessage(type: 'success' | 'info' | 'error', details: string) {
    this.hasMessage.set(true);
    this.state.set(type);
    this.message.set(details);
    setTimeout(() => { this.hasMessage.set(false) }, 3000);
  }
}