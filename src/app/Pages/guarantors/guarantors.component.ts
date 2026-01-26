import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { GuarantorResponse } from '../../shared/models/guarantor.models';
import { GuarantorFilesComponent } from '../../shared/compoments/guarantor-files/guarantor-files.component';

@Component({
  selector: 'app-guarantors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToolbarModule,
    GuarantorFilesComponent
  ],
  templateUrl: './guarantors.component.html',
  styleUrl: './guarantors.component.scss'
})
export class GuarantorsComponent {
  guarantors: GuarantorResponse[] = [];
  displayDialog: boolean = false;
  guarantor: Partial<GuarantorResponse> = {};
  isNew: boolean = true;
  selectedGuarantorId: number | null = null;
  displayFilesDialog: boolean = false;

  addNew() {
    this.isNew = true;
    this.guarantor = {};
    this.displayDialog = true;
  }

  editGuarantor(guarantor: GuarantorResponse) {
    this.isNew = false;
    this.guarantor = { ...guarantor };
    this.displayDialog = true;
  }

  deleteGuarantor(guarantor: GuarantorResponse) { 

  }

  saveGuarantor() { 
    
  }

  manageFiles(guarantor: GuarantorResponse) {
    this.selectedGuarantorId = guarantor.id;
    this.displayFilesDialog = true;
  }
}