import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-card-stat',
  imports: [CommonModule],
  templateUrl: './card-stat.component.html',
  styleUrl: './card-stat.component.scss'
})
export class CardStatComponent {
  count = input<number>(0);
  text = input<string>('');
}
