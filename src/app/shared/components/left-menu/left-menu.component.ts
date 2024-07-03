
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../form/components';
import { DEFAULT_IMAGES } from './../../../core/constants/image';
import { Component } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [
    ButtonComponent,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {
  staticImages: any = DEFAULT_IMAGES;
  menuItems: MenuItem[] = [{
    icon: 'my_location',
    name: 'Manage Outlets',
    route: '/outlets'
  },{
    icon: 'event_available',
    name: 'Manage Events',
    route: '/events'
  },{
    icon: 'group',
    name: 'Cashier Accounts',
    route: '/accounts'
  }];
}


interface MenuItem {
  icon ?: string;
  name ?: string;
  route ?: string;
}
