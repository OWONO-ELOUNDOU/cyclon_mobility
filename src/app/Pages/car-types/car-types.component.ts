import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';

import { CarType } from '../../shared/models/car-types-models';

import { NavbarComponent } from '../../shared/compoments/navbar/navbar.component';

@Component({
  selector: 'app-car-types',
  imports: [CommonModule, FormsModule, NavbarComponent, TableModule, ButtonModule, DialogModule, InputTextModule, ToolbarModule],
  templateUrl: './car-types.component.html',
  styleUrl: './car-types.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class CarTypesComponent implements OnInit {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  isNew = signal<boolean>(true);
  displayDialog = signal<boolean>(false);
  carType = signal<Partial<CarType>>({})
  carTypesList = signal<CarType[]>([])

  constructor() { }

  ngOnInit(): void {
    
  }

  loadCarTypes() { }

  addNew() {
    this.isNew.set(true);
    this.carType.set({});
    this.displayDialog.set(true);
  }

  editCarType(carType: any) {
    this.isNew.set(false);
    this.carType.set({ ...carType });
    this.displayDialog.set(true);
  }

  deleteCarType(carType: any) {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir supprimer "${carType.title}"?`,
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Call service to delete car type
        this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: `Car Type "${carType.title}" supprimé.` });
        this.loadCarTypes();
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Annulée', detail: 'Suppression annulée.' });
      }
    });
  }

  saveCarType() {
    
  }
}


