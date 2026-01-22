import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Import de service
import { UserResponse } from '../../models/user.models';
import { UserService } from '../../../services/User/user.service';
import { AuthenticationService } from '../../../services/Authentication/authentication.service';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(AuthenticationService);

  isLoading = signal<boolean>(false);
  currentUser = signal<UserResponse | null>(null);

  constructor() { }

  ngOnInit(): void {
    this.fecthUserInfo();
  }

  fecthUserInfo() {
    try {
      this.userService.getUserInfo().subscribe({
        next: (data) => {
          console.log(data);
          this.currentUser.set(data);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  navigateTo(path: string) {
    this.router.navigate([`/${path}`]);
  }

  logOut() {
    localStorage.clear();
    this.navigateTo('/login');
    //this.isLoading.update( v => !v);
    /*
    try {
      this.authService.signOut().subscribe({
        next: () => {
          this.isLoading.update( v => !v);
          localStorage.clear();
          this.navigateTo('/login');
        },
        error: (error) => {
          this.isLoading.update( v => !v);
          console.log(error.message);
        }
      })
    } catch (error) {
      this.isLoading.update( v => !v);
      console.log(error);
    }
      */
  }
}
