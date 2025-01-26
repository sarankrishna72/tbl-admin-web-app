import { Component, effect, inject, OnInit } from '@angular/core';
import { MainContainerComponent } from '../../../../../shared/components/main-container/main-container.component';
import { MainCommonComponent } from '../../../main-common';
import { DEFAULT_IMAGES } from '../../../../../core/constants';
import { ButtonComponent, FormComponent, PopupComponent } from '../../../../../shared/components';
import { checkActionShow, getObjValueFromPath } from '../../../../../core/lib/lib';
import { Location } from '@angular/common';
import { FormActionsComponent } from '../../../../../shared/components/form/components/form-actions/form-actions.component';
import { ConfirmPopupComponent } from '../../../../../shared/components/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [
    MainContainerComponent,
    ButtonComponent,
    PopupComponent,
    FormActionsComponent,
    FormComponent,
    ConfirmPopupComponent
  ],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.scss'
})
export class ViewDetailsComponent extends MainCommonComponent implements OnInit {
  public _location = inject(Location)

  override configureCallback(): void {
    if (this.configurations?.viewApi) {
      let url = this.configurations?.viewApi.url.split("{id}").join(this._commonService.getCurrentPageRouteData().id)
      const config = {...this.configurations.viewApi, ...{url}}
      this.getApi(config).subscribe((response: any) => {
        this.selectedData = response;
      })
    }
  }

  checkActionShow(action: any) {
    return checkActionShow(action, this.selectedData);
  }

  getColumnData(columnKey: string, rowData: any) {
    return getObjValueFromPath(rowData, columnKey) != '' ? getObjValueFromPath(rowData, columnKey) : null
  }

  actionViewCTA(action: any) {
    this.actionCTA({...action, ...{data: this.selectedData}}, false)
  }
  
  
}
