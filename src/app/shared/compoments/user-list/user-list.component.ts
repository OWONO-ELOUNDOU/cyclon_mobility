import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  private router = inject(Router);
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

  onDelete() {
    try {
      this.userService.deleteUser().subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error) => {
          console.log(error);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
}
