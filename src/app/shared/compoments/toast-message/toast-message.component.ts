import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-toast-message',
  imports: [CommonModule],
  templateUrl: './toast-message.component.html',
  styleUrl: './toast-message.component.scss'
})
export class ToastMessageComponent {
  message = input<string>('');
  state = input<string>('');
}
