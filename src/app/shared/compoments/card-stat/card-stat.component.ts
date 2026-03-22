import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagModule } from 'primeng/tag';

@Component({
  standalone: true,
  selector: 'app-card-stat',
  imports: [CommonModule, TagModule],
  templateUrl: './card-stat.component.html',
  styleUrl: './card-stat.component.scss'
})
export class CardStatComponent {
  count = input<number>(0);
  text = input<string>('');
  tagType = input<string>(''); // 'success', 'warning', 'error', 'info'
  tagText = input<string>(''); // Text to display inside the tag
}
