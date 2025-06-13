import { Component, effect, Inject, inject, PLATFORM_ID } from '@angular/core';
import { ButtonComponent } from '../form/components/button/button.component';
import { AppStoreService } from '../../services/store/app-store.service';
import { CommonModule } from '@angular/common';
import { ToastModel } from '../../../core/model';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-toast',
    imports: [
        ButtonComponent,
        CommonModule
    ],
    templateUrl: './toast.component.html',
    styleUrl: './toast.component.scss'
})
export class ToastComponent {
  public _appStoreService = inject(AppStoreService)
  loadedToastIds: any[] = [];

  public toastEffect = effect(() => {
    let toasts = this._appStoreService.getToasts();
    toasts = toasts.filter(toast => toast.autoClose);
    for (const toast of toasts) {
      if (!this.loadedToastIds.includes(toast.id)) {
        setTimeout(() => {
          this.onToastClose(toast);
        }, toast.duration! * 1000);
      }
    }
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

  }

  onToastClose(toast: any) {
    if (isPlatformBrowser(this.platformId)) {
      let toastElement = document.getElementById(toast.id) as HTMLElement;
      if (toastElement) toastElement.classList.add('hide')
      setTimeout(() => this._appStoreService.removeToast(toast.id) , 300)
    }
  }

  /**
   * Get Toast icon for toast
   *
   * @param {ToastModel} toast
   * @return {*}
   * @memberof ToastComponent
   */
  getIcon(toast: ToastModel) {
    if (toast.icon) return toast.icon;
    switch (toast.toastType) {
      case 'success':
       return 'check';
      case 'error':
       return 'error';
      case 'warning':
       return 'warning';
      case 'info':
       return 'question_mark';
      default:
        return 'check';
    }
  }

}
