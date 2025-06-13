import { Component, effect, inject, OnInit } from "@angular/core";
import { CommonService } from "../../shared/services/common/common.service";
import { AppStoreService } from "../../shared/services/store/app-store.service";
import { CrudPageModel } from "../../core/model";
import { Observable } from "rxjs/internal/Observable";
import { HttpService } from "../../shared/services/http/http.service";
import { CREATE, DELETE, EDIT } from "../../core/constants/const";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { DEFAULT_IMAGES } from "../../core/constants";
import { ToastService } from "../../shared/services/toast/toast.service";
import { getObjValueFromPath } from "../../core/lib/lib";

@Component({
    selector: 'app-main-common',
    imports: [],
    template: ''
})
export class MainCommonComponent implements OnInit{ 
    public _appStoreService = inject(AppStoreService)
    public _commonService = inject(CommonService)
    public _httpService = inject(HttpService);
    public _router = inject(Router);
    public _toastService = inject(ToastService);
    staticImages:any =  DEFAULT_IMAGES;
    tableData: any = [];

    selectedData: any;
    configurations: CrudPageModel | null = null;
    actionType: string = '';
    formGroup: FormGroup = new FormGroup({});
    CONST_CREATE = CREATE;
    CONST_DELETE = DELETE;
    CONST_EDIT = EDIT; 
    selectedAction: any;
    public loggingEffect = effect(() => {
        if (this._appStoreService.getCurrentPageConfig()) {
          this.configurations = this._appStoreService.getCurrentPageConfig();
          this.configureCallback();
        } else {
          this.configurations = null
        }
    });

    configureCallback() {

    }

    getApi(api: any, data ?: any): Observable<any> {
        let url = "";
        switch (api.method) {
          case "get":
            return this._httpService.get(api.url, data);
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

    deleteData(data: any, isIndexPage = true) {
      this.getApi(this.configurations?.deleteApi).subscribe((response: any) => {
        this._toastService.success({autoClose: true, message: response.message, duration: 3, title: "Success"});
        if (isIndexPage) {
          this.tableData =  this.tableData.filter((x: any) => x.id != data.id)
        } else {
          this._router.navigate([`admin/${this.configurations!.id}`]);
        }
        
      })
    }

    actionCTA(action: any, isIndexPage = true) {
      this.selectedData = null;
      this.formGroup.reset();
      let actionLabel: any;
      this.selectedAction = action;
      let buttonsList:any = [];
      switch (action.actionId) {
        case "view":
          this._router.navigate([`admin/${this.configurations!.id}/details/${action.data.id}`]);
          break;
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
          if (this.configurations?.formDisplayKeys?.length) {
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
          this._appStoreService.setConfirmPopup( {
            title: "Are you sure you want delete this event?",
            data: action.data,
            cancelBtnConfig: {
              label: 'Cancel'
            },
            active: true,
            confirmBtnConfig: {
              label: 'Delete',
              callback: (data: any) => {
                this.deleteData(data, isIndexPage);
              }
            }
          })
          break;
        default:
          break;
      }
    }

    onSubChildFormReady(event: any): void {
      let data: any;
      if (this.configurations?.formDisplayKeys?.length) {
        data = this.restructureEditFormData(this.selectedData);
      }
      let obj: any = {}
      if (event.length > 0) {
        for (const key of event) {
          obj[key] = data[key] || null;
        }
        this.formGroup.patchValue(obj)
      }
    }
  
  
    restructureEditFormData(data: any): void {
      let obj: any = {}
      for (const item of this.configurations?.formDisplayKeys!) {
        obj[item.mappingKey] = getObjValueFromPath(data, item.key)
      }
      return obj;
    }

    createData(formData: any) {
      this.getApi(this.configurations?.createApi, formData).subscribe((response: any) => {
        this._toastService.success({autoClose: true, message: response.message, duration: 3, title: "Success"});
        this.tableData = [...this.tableData, ...[response.data]];
        this._appStoreService.closePopup();
      })
    }
  
    updateData(formData: any, isIndexPage = true) {
      this.getApi(this.configurations?.updateApi, formData).subscribe((response: any) => {
        this._toastService.success({autoClose: true, message: response.message, duration: 3, title: "Success"});
        if (isIndexPage) {
          let rowIndex = this.tableData.findIndex((row: any) => row.id == response.data.id);
          let tableDataVar = JSON.parse(JSON.stringify(this.tableData))
          if (rowIndex != -1) {
            tableDataVar[rowIndex] = response.data
            this.tableData = tableDataVar;
          }
        } else {
          this.selectedData = response.data;
        }
        
        this._appStoreService.closePopup();
      })
    }
  
    generateFormData(event: any) {
      let formData = new FormData();
      for (const key of Object.keys(event.value)) {
        if (event.value[key] instanceof FileList) {
          let value = event.value[key];
          for (let i = 0; i < value.length; i++) {
             formData.append(`${this.configurations?.apiParams}[${key}][]`, value[i])
          }
        } else {
          formData.append(`${this.configurations?.apiParams}[${key}]`, event.value[key]);
        }
      }
      return formData;
    }
  
    onSubmit(event: any, isIndexPage = true) {
      if (event.action = "submit") {
        let formData = this.generateFormData(event)
        if (!this.selectedData) {
         this.createData(formData);
        } else {
         this.updateData(formData, isIndexPage)
        }
      }
    }
    

    ngOnInit(): void {
        this._commonService.getPageConfiguration();
    }

}