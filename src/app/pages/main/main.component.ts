import { DEFAULT_IMAGES } from './../../core/constants/image';
import { Component, OnInit, inject, effect } from '@angular/core';
import { AppStoreService } from '../../shared/services/store/app-store.service';
import { CommonService } from '../../shared/services/common/common.service';
import { CrudPageModel } from '../../core/model';
import { NavigationEnd, Router } from '@angular/router';
import { ButtonComponent, FormComponent, MainContainerComponent, TitleComponent, PopupComponent, TableComponent, PageHeaderComponent } from '../../shared/components';
import { CREATE, DELETE, EDIT } from '../../core/constants/const';
import { FormGroup } from '@angular/forms';
import { HttpService } from '../../shared/services/http/http.service';
import { getObjValueFromPath } from '../../core/lib/lib';
import { Observable } from 'rxjs';
import { ToastService } from '../../shared/services/toast/toast.service';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MainContainerComponent,
    TitleComponent,
    ButtonComponent,
    TableComponent,
    PopupComponent,
    FormComponent,
    PageHeaderComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  staticImages:any =  DEFAULT_IMAGES;
  public _appStoreService = inject(AppStoreService)
  public _commonService = inject(CommonService)
  public _router = inject(Router);
  public _httpService = inject(HttpService);
  public _toastService = inject(ToastService);
  tableData: any = [];
  configurations: CrudPageModel| null = null;
  actionType: string = '';
  CONST_CREATE = CREATE;
  CONST_DELETE = DELETE;
  CONST_EDIT = EDIT;
  formGroup: FormGroup = new FormGroup({});
  selectedData: any;

  private loggingEffect = effect(() => {
    if (this._appStoreService.getCurrentPageConfig()) {
      this.configurations = this._appStoreService.getCurrentPageConfig();
      if (this.configurations?.list_api) {
        this.generateList();
      }
    } else {
      this.configurations = null
    }
  });


  changeRouterEvent():void {
    this._router.events.subscribe((val) => {
       if (val instanceof NavigationEnd) {
        this._commonService.getPageConfiguration();
      }
    });
  }



  onSubmit(event: any) {
    if (event.action = "submit") {
      let formData = new FormData();
      for (const key of Object.keys(event.value)) {
        if (event.value[key] instanceof FileList) {
          let value = event.value[key];
          for (let i = 0; i < value.length; i++) {
             formData.append(`${this.configurations?.api_params}[${key}][]`, value[i])
          }
        } else {
          formData.append(`${this.configurations?.api_params}[${key}]`, event.value[key]);
        }
      }
      if (!this.selectedData) {
        this.getApi(this.configurations?.create_api, formData).subscribe((response: any) => {
          this._toastService.success({autoClose: true, message: response.message, duration: 3, title: "Success"});
          this.tableData = [...this.tableData, ...[response.data]];
          this._appStoreService.closePopup();
        })
      } else {
        this.getApi(this.configurations?.update_api, formData).subscribe((response: any) => {
          this._toastService.success({autoClose: true, message: response.message, duration: 3, title: "Success"});
          let rowIndex = this.tableData.findIndex((row: any) => row.id == response.data.id);
          let tableDataVar = JSON.parse(JSON.stringify(this.tableData))
          if (rowIndex != -1) {
            tableDataVar[rowIndex] = response.data
            this.tableData = tableDataVar;
          }
          this._appStoreService.closePopup();
        })
      }
    }
  }

  getApi(api: any, data ?: any): Observable<any> {
    let url = "";
    switch (api.method) {
      case "get":
        return this._httpService.get(api.url);
      case "post":
        return this._httpService.post(api.url, data);
      case "put":
        url = api.url.split("{id}").join(this.selectedData.id)
        return this._httpService.put(url, data);
      case "delete":
        url = api.url.split("{id}").join(this.selectedData.id)
        return this._httpService.delete(url, data);
      default:
        return this._httpService.get(api.url);
    }
  }

  generateList() {
    this.getApi(this.configurations?.list_api).subscribe((response: any) => {
      this.tableData = response.data || [];
    })
  }


  actionCTA(action: any) {
    this.selectedData = null;
    this.formGroup.reset();
    let actionLabel: any;
    let buttonsList:any = [];
    switch (action.action_id) {
      case "create":
        actionLabel = this.configurations?.actionsLabel?.find(x => x.type == this.CONST_CREATE);
        buttonsList = this.configurations?.formConfigs?.actions?.map(x => {return {...x, label: x.actionType == 'submit' ? actionLabel.buttonLabel : x.label } })
        this.configurations!.formConfigs!.actions = buttonsList;
        this.actionType = this.CONST_CREATE;
        this._appStoreService.setPopupShowing();
        break;
      case "edit":
        this.actionType = this.CONST_EDIT;
        actionLabel = this.configurations?.actionsLabel?.find(x => x.type == this.CONST_EDIT)
        buttonsList = this.configurations?.formConfigs?.actions?.map(x => {return {...x, label: x.actionType == 'submit' ? actionLabel.buttonLabel : x.label } })
        this.configurations!.formConfigs!.actions = buttonsList;
        let data = action.data;
        this._appStoreService.setPopupShowing();
        if (this.configurations?.form_display_keys?.length) {
          data = this.restructureEditFormData(data);
        }
        setTimeout(() =>
          { this.formGroup.patchValue(data); }
        ,10)
        this.selectedData  = action.data;
        break;
      case "delete":
        this.actionType = this.CONST_DELETE;
        this.selectedData  = action.data;
        this.getApi(this.configurations?.delete_api).subscribe((response: any) => {
          this._toastService.success({autoClose: true, message: response.message, duration: 3, title: "Success"});
          this.tableData =  this.tableData.filter((x: any) => x.id != action.data.id)
          this._appStoreService.closePopup();
        })
        break;
      default:
        break;
    }
  }


  restructureEditFormData(data: any): void {
    let obj: any = {}
    for (const item of this.configurations?.form_display_keys!) {
      obj[item.mappingKey] = getObjValueFromPath(data, item.key)
    }
    return obj;
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
