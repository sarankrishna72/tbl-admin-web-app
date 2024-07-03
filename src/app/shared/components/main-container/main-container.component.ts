import { AppStoreService } from './../../services/store/app-store.service';
import { Component, inject } from '@angular/core';
import { LeftMenuComponent } from '../left-menu/left-menu.component';
import { OutsideClickDirective } from '../../directives/outside-click/outside-click.directive';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [
    LeftMenuComponent,
    OutsideClickDirective

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
