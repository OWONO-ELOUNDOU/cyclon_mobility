import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

import { SupplierService } from '../../../services/Supplier/supplier.service';

@Component({
  standalone: true,
  selector: 'app-driver-verification',
  imports: [],
  templateUrl: './driver-verification.component.html',
  styleUrl: './driver-verification.component.scss'
})
export class DriverVerificationComponent {
  private supplierService = inject(SupplierService);

  place = input<string | undefined>('');
  driverId = signal<number>(0);
  isLoading = signal<boolean>(false);
  verificationForm: FormGroup = new FormGroup({
    isAddressConfirmation: new FormControl(true),
    isNeighborhoodConfirmation: new FormControl(true),
    location: new FormControl('')
  });

  onVerify() {
    this.driverId.set(localStorage.getItem('driverId') ? parseInt(localStorage.getItem('driverId') as string, 10) : 0);
    this.verificationForm.patchValue({
      location: this.place()
    });
    
    try {
      this.isLoading.set(true);
      this.supplierService.verifyDriver(this.driverId(), this.verificationForm.value).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          window.location.reload();
          console.log('Driver verified successfully:', response);
        },
        error: (error) => {
          console.error('Error verifying driver:', error);
          this.isLoading.set(false);
        }
      });
    } catch (error) {
      console.log('Unexpected error verifying driver:', error);
      this.isLoading.set(false);
    }
  }
}
