import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import de composants
import { SidebarComponent } from './shared/compoments/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cyclon_mobility';
}
