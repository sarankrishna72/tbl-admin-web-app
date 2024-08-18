import { Component } from '@angular/core';
import { MainContainerComponent } from '../../../shared/components';

@Component({
  selector: 'app-cashier-home',
  standalone: true,
  imports: [
    MainContainerComponent
  ],
  templateUrl: './cashier-home.component.html',
  styleUrl: './cashier-home.component.scss'
})
export class CashierHomeComponent {

}
