import { Component, inject } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';
import { IndexedDbService } from '../../../../shared/services/storage/indexed-db.service';
import { AppStoreService } from '../../../../shared/services/store/app-store.service';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashier-sign-in',
  standalone: true,
  imports: [
    SignInComponent
  ],
  templateUrl: './cashier-sign-in.component.html',
  styleUrl: './cashier-sign-in.component.scss'
})
export class CashierSignInComponent {
  public _apiService = inject(ApiService);
  public _toastService = inject(ToastService);
  public _appStoreService = inject(AppStoreService);
  private _indexedDbService = inject(IndexedDbService)
  private _router: Router = inject(Router);

   onFormSubmit(event: any): void {
    this._apiService.cashierSignIn(event).subscribe((res: any) => {
      this._indexedDbService.addItem({id: 'token', user_type: "cashier", value: res.auth_token,  description: 'cashier sign in auth token', encryption: true}).then(() => {
        this._toastService.success({message: `Welcome back ${res.email} `, autoClose: true, title: 'Signed in successfully!'});
        this._router.navigate(["/cashier/home"]);
      }).catch((error) => {
        console.error(error)
      })
    })
  }
}
