
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DEFAULT_IMAGES } from './../../../core/constants/image';
import { Component, inject, OnInit } from '@angular/core';
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
export class LeftMenuComponent implements OnInit {
  staticImages: any = DEFAULT_IMAGES;
  private _indexedDbService = inject(IndexedDbService);
  private _toastService = inject(ToastService);
  private _router = inject(Router);
  menuItems: MenuItem[]  = [];
  currentUserData: any;

  ngOnInit(): void {
    this._indexedDbService.getItem("token").then( (res) => {
      this.currentUserData = res;
      this.setMenuItems();
    })
  }


  setMenuItems() {
    if (this.currentUserData.user_type == 'admin') {
      this.menuItems = [{
        icon: 'my_location',
        name: 'Manage Outlets',
        route: APP_PAGES_PATH.OUTLETS_PATH
      },{
        icon: 'event_available',
        name: 'Manage Events',
        route: APP_PAGES_PATH.EVENTS_PATH
      },{
        icon: 'group',
        name: 'Cashier Accounts',
        route:  APP_PAGES_PATH.ACCOUNTS_PATH
      }]
    } else {
      this.menuItems = [{
        icon: 'my_location',
        name: 'Manage Wallet',
        route: APP_PAGES_PATH.CASHIER_HOME
      }]
    }
  }


  /**
   * Logout the Application
   *
   * @memberof LeftMenuComponent
   */
  logoutAdmin() {
    this._indexedDbService.deleteItem('token').then((res: any) => {
      this._toastService.success({title: 'Success!', message: "Logout successfully. Redirecting to log in screen."});
      if (this.currentUserData.user_type === 'admin') {
        this._router.navigate([APP_PAGES_PATH.ADMIN_SIGNIN_PATH])
        return false;
      }
      this._router.navigate([APP_PAGES_PATH.CASHIER_SIGNIN_PATH])
      return false;
    })
  }

}


interface MenuItem {
  icon ?: string;
  name ?: string;
  route ?: string;
}
