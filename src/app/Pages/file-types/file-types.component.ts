import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { FileType, FileTypeResponse } from '../../shared/models/file-type.models';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileTypeService } from '../../services/file-type/file-type.service';

@Component({
  selector: 'app-file-types',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToolbarModule
  ],
  templateUrl: './file-types.component.html',
  styleUrl: './file-types.component.scss'
})
export class FileTypesComponent implements OnInit {
  private fileTypeService = inject(FileTypeService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  fileTypes: FileTypeResponse[] = [];
  displayDialog: boolean = false;
  fileType: Partial<FileTypeResponse> = {};
  isNew: boolean = true;

  ngOnInit(): void {
    this.loadFileTypes();
  }

  loadFileTypes(): void {
    this.fileTypeService.getAllFileTypes().subscribe({
      next: (data: FileTypeResponse[]) => {
        this.fileTypes = data;
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not load file types.' });
        console.error(err);
      }
    });
  }

  addNew() {
    this.isNew = true;
    this.fileType = {};
    this.displayDialog = true;
  }

  editFileType(fileType: FileTypeResponse): void {
    this.isNew = false;
    this.fileType = { ...fileType };
    this.displayDialog = true;
  }

  deleteFileType(fileType: FileTypeResponse): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${fileType.title}"?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.fileTypeService.deleteFileType(fileType.id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File Type Deleted' });
            this.fileTypes = this.fileTypes.filter(ft => ft.id !== fileType.id);
          },
          error: (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Deletion Failed' });
            console.error(err);
          }
        });
      }
    });
  }

  saveFileType(): void {
    if (!this.fileType.title) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Title is required.' });
      return;
    }

    const payload: FileType = { title: this.fileType.title };

    const operation = this.isNew
      ? this.fileTypeService.createFileType(payload)
      : this.fileTypeService.updateFileType(this.fileType.id!, payload);

    operation.subscribe({
      next: (response: FileTypeResponse) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `File Type ${this.isNew ? 'Created' : 'Updated'}` });
        this.loadFileTypes();
        this.displayDialog = false;
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Operation Failed' });
        console.error(err);
      }
    });
  }
}