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
  usersList = signal<User[]>([]);
  isLoading = signal<boolean>(false);

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
    this.isLoading.set(true);
    
    try {
      this.userService.deleteUser(id).subscribe({
        next: () => window.location.reload(),
        error: (error) => {
          alert('Erreur lors de la suppression');
          this.isLoading.set(false);
        },
      })
    } catch (error) {
      alert('Erreur lors de la suppression');
      this.isLoading.set(false);
    }
  }
}
