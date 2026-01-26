import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-guarantor-files',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    DropdownModule,
    FileUploadModule,
    TableModule,
    ButtonModule
  ],
  templateUrl: './guarantor-files.component.html',
  styleUrl: './guarantor-files.component.scss'
})
export class GuarantorFilesComponent implements OnInit {
  @Input() guarantorId: number | null = null;

  fileCategories: any[] = [];
  selectedCategory: any = null;
  guarantorFiles: any[] = [];

  private messageService = inject(MessageService);

  ngOnInit(): void {
    // TODO: Load actual categories from a service
    this.fileCategories = [
      { title: 'Identity Proof', id: 1 },
      { title: 'Address Proof', id: 2 }
    ];
  }

  onUpload(event: any) {
    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  downloadFile(file: any) {
    console.log('Downloading', file);
  }

  deleteFile(file: any) {
    console.log('Deleting', file);
  }
}