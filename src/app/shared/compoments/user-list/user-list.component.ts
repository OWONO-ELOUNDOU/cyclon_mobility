import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';

import { User } from '../../models/user.models';
import { UserService } from '../../../services/User/user.service';

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [CommonModule, TableModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  state = signal<string>('');
  message = signal<string>('');
  usersList = signal<User[]>([]);
  isLoading = signal<boolean>(false);
  isDeleting = signal<boolean>(false);
  hasMessage = signal<boolean>(false);

  private userService = inject(UserService);

  constructor() {

  }

  ngOnInit(): void {
    this.fetchUsersList();
  }

  fetchUsersList() {
    try {
      this.userService.getAllUsers().subscribe({
        next: (data) => {
          console.log(data);
          this.usersList.set(data);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  onDelete(id: number) {
    this.isDeleting.set(true);
    
    try {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.isDeleting.set(false);
          this.showMessage('success', 'Utilisateur supprimé avec succès');
          window.location.reload()
        },
        error: (error) => {
          this.isDeleting.set(false);
          console.log(error.message);
          this.showMessage('error', `Erreur lors de la suppression de l\'utilisateur`);
        },
      })
    } catch (error) {
      this.isDeleting.set(false);
      alert('Erreur lors de la suppression');
    }
  }

  showMessage(type: 'success' | 'error' | 'info', details: string) {
    this.hasMessage.set(true);
    this.state.set(type);
    this.message.set(details);
    setTimeout(() => {
      this.hasMessage.set(false);
    }, 3000);
  }
}
