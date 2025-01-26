import { Injectable, WritableSignal, signal } from '@angular/core';
import { CrudPageModel, ToastModel } from '../../../core/model';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  private isSideMenuOpened:WritableSignal<boolean> = signal(false);
  private loading:WritableSignal<boolean> = signal(false);
  private currentPageConfig: WritableSignal<CrudPageModel | null> = signal(null);
  private popupShowing: WritableSignal<boolean> = signal(false);
  private confirmPopup: WritableSignal<{ 
    data: any,
    containerClass ?: string, 
    active: boolean, 
    title: string, 
    cancelBtnConfig : {callback?: Function, classes ?: string, isHide ?: boolean, label: string}, 
    confirmBtnConfig : {callback : Function, classes ?: string, isHide ?: boolean, label: string} 
  } | null> = signal(null);
  private toasts: WritableSignal<ToastModel[]> = signal([]);
  constructor() { }


  setConfirmPopup(obj: { 
      data: any,
      containerClass ?: string, 
      active: boolean, 
      title: string, 
      cancelBtnConfig : { callback?: Function, classes ?: string, isHide ?: boolean, label: string}, 
      confirmBtnConfig : { callback : Function, classes ?: string, isHide ?: boolean, label: string} 
    } | null
  ) {
    this.confirmPopup.set(obj)
  }

  getConfirmPopup() {
    return this.confirmPopup();
  }

  /**
   * Toggle Loader
   *
   * @memberof AppStoreService
   */
  setLoading(value: boolean) {
    this.loading.set(value)
  }

  /**
   *Get Loader Value
   *
   * @readonly
   * @memberof AppStoreService
   */
  getLoader(): boolean {
    return this.loading();
  }


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
