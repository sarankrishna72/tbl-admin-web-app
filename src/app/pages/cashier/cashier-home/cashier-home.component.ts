import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormComponent, PageHeaderComponent, MainContainerComponent, PopupComponent, TitleComponent, TableComponent, ButtonComponent } from '../../../shared/components';
import { CASHIER_CUSTOMER_CALCULATE_WALLET_FORM, CASHIER_CUSTOMER_FORM_DATA } from '../../../core/configurations/forms';
import { FormConfig, PaginationInterface, TablePagination } from '../../../core/model';
import { ApiService } from '../../../shared/services/api/api.service';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { FormGroup } from '@angular/forms';
import { AppStoreService } from '../../../shared/services/store/app-store.service';
import { MomentDatePipe } from '../../../core/pipes';
import { TabsComponent } from '../../../shared/components/tabs/tabs.component';
import { TabItemComponent } from '../../../shared/components/tabs/components/tab-item/tab-item.component';
import { SvgIconComponent } from '../../../shared/components/svg-icon/svg-icon.component';
import { cashierTableConfig } from '../../../core/configurations/tables/cashier-user-wallet-history';
import { NgTemplateOutlet } from '@angular/common';
import { DEFAULT_IMAGES } from '../../../core/constants';

interface UserDetails {
  balance_amount: number,
  id: number,
  last_updated_on: string,
  name: string,
  phone_number: string
}

@Component({
    selector: 'app-cashier-home',
    imports: [
        MainContainerComponent,
        TitleComponent,
        FormComponent,
        PopupComponent,
        PageHeaderComponent,
        MomentDatePipe,
        TabsComponent,
        TabItemComponent,
        SvgIconComponent,
        TableComponent,
        ButtonComponent,
        NgTemplateOutlet
    ],
    templateUrl: './cashier-home.component.html',
    styleUrl: './cashier-home.component.scss'
})



export class CashierHomeComponent {
  cashierFormConfig: FormConfig = CASHIER_CUSTOMER_FORM_DATA;
  cashierWalletCaluclationFormConfig: FormConfig = CASHIER_CUSTOMER_CALCULATE_WALLET_FORM;
  _apiService: ApiService = inject(ApiService);
  _toastService: ToastService = inject(ToastService)
  _appStoreService: AppStoreService = inject(AppStoreService)
  userDetails: WritableSignal<UserDetails | null>  = signal(null);
  paginationData!: PaginationInterface | null;
  userDetailsForm: FormGroup<any> = new FormGroup({})
  calculateFormGroup: FormGroup<any> = new FormGroup({})
  popupDetails: any;
  tableConfigs = cashierTableConfig;
  walletHistoriesData: any[] = [];
  popupType = "";
  IMAGE_CONSTANTS = DEFAULT_IMAGES;
  private _useEffect = effect(() => {
    if (!this._appStoreService.getPopupShowing()) this.popupDetails = null;
    if (this.userDetails())   {
      this.paginationData = {page: 1, per_page: 15};
      this.getWalletHistoriesData();
    }
  })


  getWalletHistoriesData() {
    this._apiService.getUserWalletHistories(this.userDetails()!.id, {per_page: 15, page: 1}).subscribe((response: any) => {
      this.walletHistoriesData = response['data'];
      this.tableConfigs.pagination = new TablePagination(response.pagination);
    
    })
  }

  constructFormData(data: any) {
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      formData.append(key, key == 'bill_attachment' ? data[key][0] : data[key]);
    }
    return formData;
  }


  addOrRedeemWalletPoints(actionType = "add") {
    let data = this.calculateFormGroup.value;
    this._apiService.cashierUpdateWalletPoints( this.constructFormData({...{action_type: actionType, phone_number: this.userDetails()!.phone_number}, ...data})).subscribe((response: any) => {
      this.userDetails.set(null);
      this.popupType = "successWallet"
      this.popupDetails = response;
      this.userDetailsForm.reset();
      this.calculateFormGroup.reset();
      // this._toastService.success({ title: "Success", message: this.popupDetails?.message})
    });
  }

  closePopup(event: any) {
    this.calculateFormGroup.reset();
    this.userDetailsForm.reset();
    this.userDetails.set(null);
  }


  submitFormData(event: any, type: string) {
     this.popupType = "";
    switch (type) {
      case 'userDetails':
        this._apiService.cashierGetUserDetails(event.value).subscribe((response: any) => {
          this.userDetails.set(response.data);
        }, error => {
          this.userDetails.set(null);
          this.paginationData = null;
        });
        break;
      case 'updateWallet':
        if (event.value.total_amount < 1) {
          this._toastService.error({ title: "Error", message: "Amount must be greater than 0"})
          return;
        }
        this._apiService.cashierCalculateWalletPoints( this.constructFormData({...{phone_number: this.userDetails()!.phone_number}, ...event.value})).subscribe((response: any) => {
          this.popupDetails = response;
          this.popupType = "calculateWallet";
          // this.userDetailsForm.reset()
          this._appStoreService.setPopupShowing()
          // this._toastService.success({ title: "Success", message: this.popupDetails?.message})
        });
        break;
      default:
        break;
    }
  }
}
