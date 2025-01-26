import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonComponent } from '../form/components/button/button.component';
import { AppStoreService } from '../../services/store/app-store.service';

@Component({
  selector: 'confirm-popup',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './confirm-popup.component.html',
  styleUrl: './confirm-popup.component.scss'
})
export class ConfirmPopupComponent {
  @Input() containerClass ?: string = '';
  public _appStoreService = inject(AppStoreService)
  
  onBtnAction(type: any) {
    const data = this._appStoreService.getConfirmPopup()?.data;
    if(type == "confirm") {
      if (this._appStoreService.getConfirmPopup() != null ) {
        this._appStoreService.getConfirmPopup()!.confirmBtnConfig.callback(data);
      }
    }
    this._appStoreService.setConfirmPopup(null);
  }
}
