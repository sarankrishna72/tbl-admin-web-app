import { DEFAULT_IMAGES } from '../../../core/constants/image';
import { Component, OnInit, inject, effect } from '@angular/core';
import { AppStoreService } from '../../../shared/services/store/app-store.service';
import { CommonService } from '../../../shared/services/common/common.service';
import { CrudPageModel, TablePagination } from '../../../core/model';
import { NavigationEnd, Router } from '@angular/router';
import { ButtonComponent, FormComponent, MainContainerComponent, TitleComponent, PopupComponent, TableComponent, PageHeaderComponent } from '../../../shared/components';
import { CREATE, DELETE, EDIT } from '../../../core/constants/const';
import { FormGroup } from '@angular/forms';
import { HttpService } from '../../../shared/services/http/http.service';
import { getObjValueFromPath } from '../../../core/lib/lib';
import { Observable } from 'rxjs';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { FormActionsComponent } from '../../../shared/components/form/components/form-actions/form-actions.component';
import { MainCommonComponent } from '../main-common';
@Component({
    selector: 'app-main',
    imports: [
        MainContainerComponent,
        ButtonComponent,
        TableComponent,
        PopupComponent,
        FormComponent,
        PageHeaderComponent,
        FormActionsComponent,
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent extends MainCommonComponent implements OnInit{
  
  
  
  paginationDetails = {
    per_page: 10,
    page: 1
  }
  
  changeRouterEvent():void {
    this._router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this._commonService.getPageConfiguration();
      }
    });
  }

  onPaginationChange(event: any) {
    this.paginationDetails = event;
    this.configureCallback();
  }


  override configureCallback() {
    if (this.configurations?.listApi) {
      this.getApi(this.configurations?.listApi, {params: this.paginationDetails}).subscribe((response: any) => {
        this.tableData = response.data || [];
        if (response.pagination) {
          this.configurations!['tableConfigs'].pagination = new TablePagination(response.pagination)
        }
      })  
    }
  }


  /**
   * Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   * Add 'implements OnInit' to the class.
   * @memberof MainComponent
   */
  override ngOnInit(): void {
    super.ngOnInit();
    this.changeRouterEvent();
  }
}
