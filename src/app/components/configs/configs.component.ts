import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.scss'],
  standalone:true, 
  imports: [
    MatCardModule, MatButtonModule, MatIconModule,RouterOutlet, RouterLink, RouterLinkActive
  ],
})
export class ConfigsComponent {

}
