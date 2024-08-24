import { Component, effect, inject, OnInit } from '@angular/core';
import { FormComponent, MainContainerComponent, PopupComponent, TitleComponent } from '../../../shared/components';
import { CASHIER_CUSTOMER_CALCULATE_WALLET_FORM, CASHIER_CUSTOMER_FORM_DATA } from '../../../core/configurations/forms';
import { FormConfig } from '../../../core/model';
import { ApiService } from '../../../shared/services/api/api.service';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { FormGroup } from '@angular/forms';
import { AppStoreService } from '../../../shared/services/store/app-store.service';

@Component({
  selector: 'app-cashier-home',
  standalone: true,
  imports: [
    MainContainerComponent,
    TitleComponent,
    FormComponent,
    PopupComponent
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
  userDetails: any ;
  userDetailsForm: FormGroup<any> = new FormGroup({})
  popupDetails: any;
  private _useEffect = effect(() => {
    if (!this._appStoreService.getPopupShowing()) this.popupDetails = null;
  })
//   {

// earned_point
// :
// 250
// message
// :
// "Congratulations Devika Sunitha, You got 250 offer points"
// redeemed_point
// :
// 0
// total_amount:// 750
// total_wallet_points:// 750
//   }

  submitFormData(event: any, type: string) {
    switch (type) {
      case 'userDetails':
        this._apiService.cashierGetUserDetails(event.value).subscribe((response: any) => {
          this.userDetails = response.data;
        });
        break;
      case 'updateWallet':
        if (event.value.total_amount < 1) {
          this._toastService.error({ title: "Error", message: "Amount must be greater than 0"})
          return;
        }
        this._apiService.cashierUpdateWalletPoints( {...{phone_number: this.userDetails.phone_number}, ...event.value}).subscribe((response: any) => {
          this.userDetails = null;
          this.popupDetails = response;
          this.userDetailsForm.reset()
          this._appStoreService.setPopupShowing()
          this._toastService.success({ title: "Success", message: this.popupDetails?.message})
        });
        break;
      default:
        break;
    }
  }
}
