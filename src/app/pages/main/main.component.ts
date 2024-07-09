import { DEFAULT_IMAGES } from './../../core/constants/image';
import { Component, OnInit, inject, effect } from '@angular/core';
import { AppStoreService } from '../../shared/services/store/app-store.service';
import { CommonService } from '../../shared/services/common/common.service';
import { CrudPageModel } from '../../core/model';
import { NavigationEnd, Router } from '@angular/router';
import { ButtonComponent, FormComponent, MainContainerComponent, TitleComponent, PopupComponent, TableComponent } from '../../shared/components';
import { CREATE, DELETE, EDIT } from '../../core/constants/const';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MainContainerComponent,
    TitleComponent,
    ButtonComponent,
    TableComponent,
    PopupComponent,
    FormComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  staticImages:any =  DEFAULT_IMAGES;
  public _appStoreService = inject(AppStoreService)
  public _commonService = inject(CommonService)
  configurations: CrudPageModel| null = null;
  public _router = inject(Router);
  actionType: string = '';
  CONST_CREATE = CREATE;
  CONST_DELETE = DELETE;
  CONST_EDIT = EDIT;
  formGroup: FormGroup = new FormGroup({});
  selectedData: any;
  private loggingEffect = effect(() => {
    if (this._appStoreService.getCurrentPageConfig()) {
      this.configurations = this._appStoreService.getCurrentPageConfig();
    } else {
      this.configurations = null
    }
  });


  changeRouterEvent():void {
    this._router.events.subscribe((val) => {
       if (val instanceof NavigationEnd) {
        this._commonService.getPageConfiguration()
      }
    });
  }


  onFormGroupReady(event: any) {
    // if (this.selectedData) {
    //   console.log(this.selectedData);
    //   event.patchValue(this.selectedData)
    // }
  }


  actionCTA(action: any) {
    this.selectedData = null;
    switch (action.action_id) {
      case "create":
        this._appStoreService.setPopupShowing();
        this.actionType = this.CONST_CREATE;
        break;
      case "edit":
        this._appStoreService.setPopupShowing();
        this.actionType = this.CONST_EDIT;
        setTimeout(() =>
          { this.formGroup.patchValue(action.data);}
        ,10)
        this.selectedData  = action.data;
        break;
      default:
        break;
    }
  }


  /**
   * Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   * Add 'implements OnInit' to the class.
   * @memberof MainComponent
   */
  ngOnInit(): void {
    this._commonService.getPageConfiguration();
    this.changeRouterEvent();
  }
}
