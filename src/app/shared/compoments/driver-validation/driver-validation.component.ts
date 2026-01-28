import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

import { SupplierService } from '../../../services/Supplier/supplier.service';

@Component({
  standalone: true,
  selector: 'app-driver-validation',
  imports: [CommonModule],
  templateUrl: './driver-validation.component.html',
  styleUrl: './driver-validation.component.scss'
})
export class DriverValidationComponent {
  private supplierService = inject(SupplierService);

  driverId = input<number>(0);
  isLoading = signal<boolean>(false);
  driverValidationForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    validatedId: new FormControl(0),
  });

  onValidate() {
    this.driverValidationForm.patchValue({ id: this.driverId().toString(), validatedId: this.driverId().toString() });
    this.isLoading.set(true);

    try {
      this.supplierService.validateDriver(this.driverId(), this.driverValidationForm.value).subscribe({
        next: (response) => {
          console.log('Driver validated successfully', response);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error validating driver', error);
          this.isLoading.set(false);
        }
      });
    } catch (error) {
      console.log('Unexpected error validating driver', error);
      this.isLoading.set(false);
    }
  }
}
