import { Injectable, WritableSignal, signal } from '@angular/core';
import { CrudPageModel, ToastModel } from '../../../core/model';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  private isSideMenuOpened:WritableSignal<boolean> = signal(false);
  private currentPageConfig: WritableSignal<CrudPageModel | null> = signal(null);
  private popupShowing: WritableSignal<boolean> = signal(false);
  private toasts: WritableSignal<ToastModel[]> = signal([]);
  constructor() { }

  /**
   * Toggle the side menu state
   *
   * @memberof AppStoreService
   */
  toggleSideMenuOpened() {
    this.isSideMenuOpened.set(!this.isSideMenuOpened());
  }

  /**
   *Get Side Menu Opened state
   *
   * @readonly
   * @memberof AppStoreService
   */
  get sideMenuOpened() {
    return this.isSideMenuOpened();
  }


  /**
   * Set Current Page Configuration
   *
   * @memberof AppStoreService
   */
  setCurrentPageConfig(value: CrudPageModel | null) {
    this.currentPageConfig.set(value);
  }


  /**
   * Get Current Page Configuration from the store
   *
   * @return {*}
   * @memberof AppStoreService
   */
  getCurrentPageConfig() {
    return this.currentPageConfig();
  }


  /**
   * Set Popup Showing
   *
   * @memberof AppStoreService
   */
  setPopupShowing() {
    this.popupShowing.set(!this.popupShowing());
  }


    /**
   * Close Popup
   *
   * @memberof AppStoreService
   */
  closePopup() {
    this.popupShowing.set(false);
  }


  /**
   * Get Popup Showing from the store
   *
   * @return {*}
   * @memberof AppStoreService
   */
  getPopupShowing() {
    return this.popupShowing();
  }


  /**
   * add Toast Data
   *
   * @memberof AppStoreService
   */
  addToast(toast: any) {
    let data = JSON.parse(JSON.stringify(this.toasts()));
    data.push(toast);
    this.toasts.set(data)
  }


  /**
   * Remove Toast Item from toasts list
   *
   * @memberof AppStoreService
   */
  removeToast(toastId: any) {
    let data = this.toasts();
    data = data.filter(toast => toast.id !== toastId);
    this.toasts.set(data);
  }


  /**
   * Get Toast Data
   *
   * @return {*}
   * @memberof AppStoreService
   */
  getToasts() {
    return this.toasts();
  }

}
