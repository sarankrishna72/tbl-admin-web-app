import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PopupConfigInterface } from '../../../core/interfaces';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../form/components/button/button.component';
import { AppStoreService } from '../../services/store/app-store.service';

@Component({
    selector: 'app-popup',
    imports: [
        CommonModule,
        ButtonComponent
    ],
    templateUrl: './popup.component.html',
    styleUrl: './popup.component.scss'
})
export class PopupComponent {
  @Input() containerClass: string = '';
  @Input() title: string = '';
  @Input() titleClass: string = '';
  @Input() bodyClass: string = '';
  @Input() popupConfig ?: PopupConfigInterface;
  public _appStoreService = inject(AppStoreService);
  @Output() closePopup: EventEmitter<any> = new EventEmitter<any>();

  onClosePopup() {
    this.closePopup.emit("close");
    this._appStoreService.setPopupShowing()
  }
}
