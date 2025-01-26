import { Injectable, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pageConfigurations } from '../../../core/configurations/pages';
import { AppStoreService } from '../store/app-store.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private currentPageRouteData: WritableSignal<any | null> = signal(null);
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _appStoreService: AppStoreService
  ) { }


  getCurrentPageRouteData() {
    return this.currentPageRouteData();
  }

  getPageConfiguration() {
    this._activatedRoute.children[0]?.children[0]?.params.subscribe((params: any) => {
      this.currentPageRouteData.set(params);
      if (params["type"]) {
        this._appStoreService.setCurrentPageConfig(pageConfigurations[params["type"]]);
      } else {
        this._appStoreService.setCurrentPageConfig(null);
      }
    });
  }

}
