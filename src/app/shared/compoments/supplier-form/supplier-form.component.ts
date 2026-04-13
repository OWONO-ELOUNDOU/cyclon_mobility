import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';

import { CarType } from '../../models/car-types-models';
import { SupplierService } from '../../../services/Supplier/supplier.service';
import { CarTypesService } from '../../../services/car-types/car-types.service';

import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-supplier-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.scss'
})
export class SupplierFormComponent implements OnInit {
  title = signal<string>('conducteurs');

  private router = inject(Router);
  private supplierService = inject(SupplierService);
  private carTypesService = inject(CarTypesService);

  carTypes = signal<CarType[]>([]);
  hasCNI = signal<string>('');
  hasLicence = signal<string>('');
  hasGuarantor = signal<string>('');
  hasWithdrawal = signal<string>('');
  isLoading = signal<boolean>(false);
  isFetching = signal<boolean>(false);
  currentMode = signal<string>('add'); // 'add' or 'edit'

  driverForm: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    birthDate: new FormControl(''),
    haveCni: new FormControl(false),
    cniNumber: new FormControl(''),
    cniExpireDate: new FormControl(''),
    haveDriverLicence: new FormControl(''),
    haveGuarantor: new FormControl(false),
    driverLicenceDebit: new FormControl(false),
    driverLicenceExpireDate: new FormControl('2028-06-30'),
    adress: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl('SecurePass123!'),
    isAdressConfirmation: new FormControl(false),
    isNeigboorhoodConfirmation: new FormControl(false),
    location: new FormControl(''),
    isDriverValidated: new FormControl(false),
    isDriverValidatedTest: new FormControl(false),
    isDriverVerification: new FormControl(false),
    profilePicture: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    //this.fetchCarTypes();
  }

  get f() {
    return this.driverForm.controls;
  }

  private fetchCarTypes() {
    this.isFetching.set(true);

    try {
      this.carTypesService.getAllTypes().subscribe({
        next: (data) => {
          this.isFetching.set(false);
          this.carTypes.set(data);
        },
        error: (error) => {
          this.isFetching.set(false);
          console.log(error);
        }
      });
    } catch (error) {
      this.isFetching.set(false);
      console.log(error);
    }
  }

  checkMode() {
    const url = this.router.url;
    if (url.includes('edit')) {
      this.currentMode.set('edit');
      this.title.set('Modifier un conducteur');
      // this.fetchDriverDetails();
    } else {
      this.currentMode.set('add');
      this.title.set('Ajouter un conducteur');
    }
  }

  checkCNI(choice: string, event: any) {
    this.hasCNI.set(choice);
    const result = event.target.value;
    console.log(result);
  }

  checkLicence(choice: string, event: any) {
    this.hasLicence.set(choice);
    const result = event.target.value;
    console.log(result);
  }

  checkWithdrawal(choice: string, event: any) {
    this.hasWithdrawal.set(choice);
    const result = event.target.value;
    console.log(result);
  }

  checkGuarantor(choice: string, event: any) {
    this.hasGuarantor.set(choice);
    const result = event.target.value;
    console.log(result);
  }

  onSubmit() {
    if (this.hasCNI() === 'non') {
      this.driverForm.patchValue({ cniExpireDate: '' });
    }
    if (this.driverForm.valid) {
      console.log(this.driverForm.value);
      this.isLoading.set(true);

      try {
        this.supplierService.createDriver(this.driverForm.value).subscribe({
          next: (data) => {
            this.isLoading.set(false);
            console.log(data);
            this.router.navigate(['/drivers']);
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
    } else {
      this.markFormGroupTouched(this.driverForm);
    }
  }

  onCreate() {
    if (this.hasCNI() === 'non') {
      this.driverForm.patchValue({ cniExpireDate: '' });
    }

    if (this.driverForm.valid) {
      console.log(this.driverForm.value);
      this.isLoading.set(true);

      try {
        this.supplierService.createDriver(this.driverForm.value).subscribe({
          next: (data) => {
            this.isLoading.set(false);
            console.log(data);
            this.router.navigate(['/drivers']);
          },
          error: (error) => {
            this.isLoading.set(false);
            console.log(error);
          }
        });
      } catch (error) {
        this.isLoading.set(false);
        console.log(error);
      }
    }
  }

  onUpdate() {
    this.isLoading.set(true);

    try {
      
    } catch (error) {
      this.isLoading.set(false);
      console.log(error);
    }
  }

  onCancel() {
    this.router.navigate(['/suppliers']);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
