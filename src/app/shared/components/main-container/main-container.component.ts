import { Component } from '@angular/core';
import { LeftMenuComponent } from '../left-menu/left-menu.component';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [
    LeftMenuComponent
  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {

}
