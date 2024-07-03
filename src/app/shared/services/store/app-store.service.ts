import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  private isSideMenuOpened:WritableSignal<boolean> = signal(false)
  constructor() { }

  toggleSideMenuOpened() {
    this.isSideMenuOpened.set(!this.isSideMenuOpened());
  }

  get sideMenuOpened() {
    return this.isSideMenuOpened();
  }
}
