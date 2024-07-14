import { inject, Injectable } from '@angular/core';
import { AppStoreService } from '../store/app-store.service';
import { ToastModel } from '../../../core/model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _appStoreService = inject(AppStoreService);

  /**
   * Method to show a success toast
   *
   * @param {ToastConfiguration} data
   * @memberof ToastService
   */
  success(data: ToastConfiguration) {
    let toast = new ToastModel({ toastType: 'success', ...data });
    this._appStoreService.addToast(toast);
  }

  /**
   * Method to show a error toast
   *
   * @param {ToastConfiguration} data
   * @memberof ToastService
   */
  error(data: ToastConfiguration) {
    let toast = new ToastModel({ toastType: 'error', ...data });
    this._appStoreService.addToast(toast);
  }


  /**
   * Method to show a warning toast
   *
   * @param {ToastConfiguration} data
   * @memberof ToastService
   */
  warning(data: ToastConfiguration) {
    let toast = new ToastModel({ toastType: 'warning', ...data });
    this._appStoreService.addToast(toast);
  }

  /**
   * Method to show a info toast
   *
   * @param {ToastConfiguration} data
   * @memberof ToastService
   */
  info(data: ToastConfiguration) {
    let toast = new ToastModel({ toastType: 'info', ...data });
    this._appStoreService.addToast(toast);
  }


  /**
   * Method to show a custom toast
   *
   * @param {ToastConfiguration} data
   * @memberof ToastService
   */
  custom(data: ToastConfiguration) {
    let toast = new ToastModel({ toastType: 'custom', ...data });
    this._appStoreService.addToast(toast);
  }

}


interface ToastConfiguration {
  title ?: string;
  message ?: string;
  duration ?: number;
  customHtml ?: string | null | undefined,
  autoClose ?: boolean
}
