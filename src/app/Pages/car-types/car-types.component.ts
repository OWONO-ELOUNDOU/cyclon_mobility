import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationService, MessageService } from 'primeng/api';

import { CarType } from '../../shared/models/car-types-models';
import { CarTypesService } from '../../services/car-types/car-types.service';

import { NavbarComponent } from '../../shared/compoments/navbar/navbar.component';
import { CardStatComponent } from '../../shared/compoments/card-stat/card-stat.component';
import { ToastMessageComponent } from '../../shared/compoments/toast-message/toast-message.component';

@Component({
  selector: 'app-car-types',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent, TableModule, DialogModule, ProgressSpinnerModule, ToastMessageComponent, CardStatComponent],
  templateUrl: './car-types.component.html',
  styleUrl: './car-types.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class CarTypesComponent implements OnInit {
  private confirmationService = inject(ConfirmationService);
  private carTypesService = inject(CarTypesService);
  private messageService = inject(MessageService);

  state = signal<string>('');
  message = signal<string>('');
  isNew = signal<boolean>(true);
  isLoading = signal<boolean>(false);
  isFetching = signal<boolean>(false);
  hasMessage = signal<boolean>(false);
  carTypesList = signal<CarType[]>([]);
  displayDialog = signal<boolean>(false);
  carType = signal<Partial<CarType> | null>(null);

  carTypeForm: FormGroup = new FormGroup({
    label: new FormControl(''),
    alertQuantity: new FormControl(0)
  })

  constructor() { }

  ngOnInit(): void {
    this.loadCarTypes();
  }

  loadCarTypes() {
    this.isFetching.set(true);
    try {
      this.carTypesService.getAllTypes().subscribe({
        next: (data) => {
          this.isFetching.set(false);
          console.log(data);
          this.carTypesList.set(data);
          this.showMessage('success', 'Types de véhicules chargés avec succès!');
        },
        error: (error) => {
          this.isFetching.set(false);
          console.log(error.message);
          this.showMessage('error', `${error.message}`);
        }
      })
    } catch (error) {
      this.isFetching.set(false);
      console.log(error);
      this.showMessage('error', 'Une erreur inattendue est survenue.');
    }
  }

  addNew() {
    this.isNew.set(true);
    this.carType.set({});
    this.displayDialog.set(true);
  }

  editCarType(carType: CarType) {
    this.isNew.set(false);
    this.carType.set({ ...carType });
    this.displayDialog.set(true);
  }

  deleteCarType(carType: CarType) {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir supprimer "${carType.label}"?`,
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Call service to delete car type
        this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: `Car Type "${carType.label}" supprimé.` });
        this.loadCarTypes();
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Annulée', detail: 'Suppression annulée.' });
      }
    });
  }

  saveCarType() {
    console.log('car type form: ', this.carTypeForm.value);

  }

  /**
   * Fonction pour gérer la soumission du formulaire, en fonction de l'état (création ou mise à jour)
   */
  onSubmit() {
    if (this.isNew()) {
      this.createCarType();
    } else if (this.carType()?.id) {
      this.updateCarType(this.carType()?.id!);
    }
  }

  createCarType() {
    this.isLoading.set(true);
    try {
      this.carTypesService.addNewtype(this.carTypeForm.value).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          console.log(response);
          this.showMessage('success', 'Type de véhicule créé avec succès!');
          this.loadCarTypes();
        },
        error: (error) => {
          this.isLoading.set(false);
          console.log(error.message);
          this.showMessage('error', `${error.message}`);
        },
        complete: () => {
          this.displayDialog.set(false);
        }
      });
    } catch (error) {
      this.isLoading.set(false);
      console.log(error);
      this.showMessage('error', 'Une erreur inattendue est survenue.');
    }
  }

  updateCarType(id: number) {
    if (!this.carType()?.id) return;
    this.isLoading.set(true);
    try {
      this.carTypesService.updateCarType(id, this.carTypeForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading.set(false);
          this.showMessage('success', 'Type de véhicule mis à jour avec succès!');
          this.loadCarTypes();
        },
        error: (error) => {
          this.isLoading.set(false);
          console.log(error);
          this.showMessage('error', `${error.message}`);
        },
        complete: () => {
          this.displayDialog.set(false);
        }
      });
    } catch (error) {
      this.isLoading.set(false);
      console.log(error);
      this.showMessage('error', 'Une erreur inattendue est survenue.');
    }
  }

  // Fonction pour afficher les messages d'erreurs
  private showMessage(type: 'success' | 'error' | 'info', details: string) {
    this.hasMessage.set(true);
    this.state.set(type);
    this.message.set(details);
    setTimeout(() => { this.hasMessage.set(false) }, 3000)
  }

}