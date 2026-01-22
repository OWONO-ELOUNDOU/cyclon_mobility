import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFormComponent } from '../../shared/compoments/user-form/user-form.component';

@Component({
  selector: 'app-users',
  imports: [CommonModule, UserFormComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

}
