import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { TableModule } from 'primeng/table';
import { UserCardComponent } from '../user-card/user-card.component';

import { SupplierResponse } from '../../models/supplier.models';
import { SupplierService } from '../../../services/Supplier/supplier.service';

@Component({
  standalone: true,
  selector: 'app-supplier-list',
  imports: [CommonModule, TableModule, UserCardComponent, FormsModule],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.scss'
})
export class SupplierListComponent {
  state = signal<string>('');
  message = signal<string>('');
  sortOption = signal<string>('');
  hasMessage = signal<string>('');
  searchValue = signal<string>('');
  searchOption = signal<string>('');
  isLoading = signal<boolean>(false);
  isSearching = signal<boolean>(false);
  driversList = signal<SupplierResponse[]>([]);
  driverResult!: SupplierResponse;
  
  private router = inject(Router);
  private supplierService = inject(SupplierService);

  constructor() {
    this.fetchUsersList();
  }

  fetchUsersList() {
    this.isLoading.set(true);
    try {
      this.supplierService.getAllDrivers().subscribe({
        next: (data) => {
          this.isLoading.set(false);
          console.log(data);
          this.driversList.set(data);
        },
        error: (error) => {
          this.isLoading.set(false);
          console.log(error);
        }
      })
    } catch (error) {
      this.isLoading.set(false);
      console.log(error);
    }
  }

  //Choisir l'option de recherche
  getSearchOption(item: string) {
    this.searchOption.set(item);
  }

  // Fonction pour afficher un conducteur selon l#option de recherche
  fetchDriverByOption() {
    if(this.searchOption() === 'email') {
      console.log('option de recherche: ', this.searchOption());
      this.searchByEmail();
    } else if(this.searchOption() === 'phone') {
      console.log('option de recherche: ', this.searchOption());
      this.searchByPhone();
    } else {
      alert('option de recherche non disponible');
    }
  }

  searchByEmail() {
    this.isSearching.set(true);

    try {
      this.supplierService.getDriverByEmail(this.searchValue()).subscribe({
        next: (data) => {
          this.isSearching.set(false);
          console.log(data);
          this.driverResult = data;
        },
        error: (err) => {
          console.log(err);
          this.isSearching.set(false);
        }
      })
    } catch (error) {
      console.log(error);
      this.isSearching.set(false);
    }
  }

  searchByPhone() {
    this.isSearching.set(true);

    try {
      this.supplierService.getDriverByPhone(this.searchValue()).subscribe({
        next: (data) => {
          this.isSearching.set(false);
          console.log(data);
          this.driverResult = data;
        },
        error: (err) => {
          console.log(err);
          this.isSearching.set(false);
        }
      })
    } catch (error) {
      console.log(error);
      this.isSearching.set(false);
    }
  }

  // Fonction pour trier la liste des conducteurs selon le status
  changeSortOption(option: string) {
    this.sortOption.set(option);
    console.log('Option de tri: ', this.sortOption());
    this.sortDriverByStatus(option);
  }

  // Fonction pour filtrer la liste des conducteurs selon le status
  sortDriverByStatus(option: string) {
    const allDrivers = [ ...this.driversList() ];
    if (option === 'all') {
      this.driversList.set(allDrivers);
      return 
    }

    let sortedList: SupplierResponse[] = []

    if (option === 'verified') {
      sortedList = allDrivers.filter((driver) => driver.isDriverVerification === true);
      console.log(sortedList);
      return this.driversList.set(sortedList);
    } else if (option === 'validated') {
      sortedList = allDrivers.filter((driver) => driver.isDriverValidated === true);
      console.log(sortedList);
      return this.driversList.set(sortedList);
    } else if (option === 'confirmed') {
      sortedList = allDrivers.filter((driver) => driver.isDriverValidatedTest === true);
      console.log(sortedList);
      return this.driversList.set(sortedList);
    } else if (option === 'pending') {
      sortedList = allDrivers.filter((driver) => driver.isDriverVerification === false);
      console.log(sortedList);
      return this.driversList.set(sortedList);
    }
  }

  navigateToDetails(driverId: number) {
    localStorage.setItem('driverId', driverId.toString());
    this.router.navigate(['/driver/details']);
  }
}
