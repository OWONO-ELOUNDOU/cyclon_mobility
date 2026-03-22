import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-driver-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './driver-form.component.html',
  styleUrl: './driver-form.component.scss'
})
export class DriverFormComponent implements OnInit {
  protected title = signal<string>('Créeer un nouveau chauffeur');

  // Gestion de l'affichage du loader et des messages de succès ou d'erreur
  protected message = signal<string>('');
  protected isError = signal<boolean>(false);
  protected isLoading = signal<boolean>(false);

  // Gestion du formulaire de création de chauffeur
  driverForm!: FormGroup;

  constructor() { }

  ngOnInit() {}

  loadForm() {
    this.driverForm = new FormGroup({
      name: new FormControl('', Validators.required),
      licenseNumber: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.driverForm.valid) {
      this.isLoading.set(true);

      // Simuler une requête API pour créer un chauffeur
      setTimeout(() => {
        this.isLoading.set(false);
        this.message.set('Chauffeur créé avec succès !');
        this.isError.set(false);
        this.driverForm.reset();
      }, 2000);
      
    } else {
      this.message.set('Veuillez remplir tous les champs requis.');
      this.isError.set(true);
    }
  }
}
