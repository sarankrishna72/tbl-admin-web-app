import { AppStoreService } from './../../services/store/app-store.service';
import { Component, inject } from '@angular/core';
import { OutsideClickDirective } from '../../directives/outside-click/outside-click.directive';
import { LeftMenuComponent } from '..';
import { ConfirmPopupComponent } from '../confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [
    LeftMenuComponent,
    OutsideClickDirective,
    ConfirmPopupComponent

  ],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss'
})
export class MainContainerComponent {
  public _appStoreService = inject(AppStoreService)

  toggleOutSide() {
    if (this._appStoreService.sideMenuOpened)  this._appStoreService.toggleSideMenuOpened()
  }
}
