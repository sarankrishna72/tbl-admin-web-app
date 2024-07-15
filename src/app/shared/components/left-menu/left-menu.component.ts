
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DEFAULT_IMAGES } from './../../../core/constants/image';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '..';
import { IndexedDbService } from '../../services/storage/indexed-db.service';
import { ToastService } from '../../services/toast/toast.service';
import { APP_PAGES_PATH } from '../../../core/constants/application_paths';

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
  private _indexedDbService = inject(IndexedDbService);
  private _toastService = inject(ToastService);
  private _router = inject(Router);
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


  /**
   * Logout the Application
   *
   * @memberof LeftMenuComponent
   */
  logoutAdmin() {
    this._indexedDbService.deleteItem('token').then(res => {
      this._toastService.success({title: 'Success!', message: "Logout successfully. Redirecting to log in screen."});
      this._router.navigate([APP_PAGES_PATH.ROOT_PATH])
    })
  }
}


interface MenuItem {
  icon ?: string;
  name ?: string;
  route ?: string;
}
