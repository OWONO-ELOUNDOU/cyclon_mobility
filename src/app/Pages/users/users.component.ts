import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { NavbarComponent } from '../../shared/compoments/navbar/navbar.component';
import { UserListComponent } from '../../shared/compoments/user-list/user-list.component';
import { UserCardComponent } from '../../shared/compoments/user-card/user-card.component';

@Component({
  selector: 'app-users',
  imports: [CommonModule, UserListComponent, NavbarComponent, UserCardComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  title = signal<string>('Utilisateurs');

  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    
  }

  fecthDriversList() {
    try {
      
    } catch (error) {
      
    }
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
