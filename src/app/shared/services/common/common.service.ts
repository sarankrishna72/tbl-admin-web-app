import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { pageConfigurations } from '../../../core/configurations/pages';
import { AppStoreService } from '../store/app-store.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private _router: Router,
    private _appStoreService: AppStoreService
  ) { }


  getPageConfiguration() {
    const currentUrl = this._router.url.split('/').pop();
    if (currentUrl) {
       this._appStoreService.setCurrentPageConfig(pageConfigurations[currentUrl]);
    } else {
    this._appStoreService.setCurrentPageConfig(null);
    }

  }

}
