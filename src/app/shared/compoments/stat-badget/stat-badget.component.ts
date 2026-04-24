import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-stat-badget',
  imports: [CommonModule],
  templateUrl: './stat-badget.component.html',
  styleUrl: './stat-badget.component.scss'
})
export class StatBadgetComponent {
  count = input<number>(0);
  text = input<string>('');
  tagType = input<string>(''); // 'success', 'warning', 'error', 'info'
  tagText = input<string>(''); // Text to display inside the tag
}
