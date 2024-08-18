import { Component, inject } from '@angular/core';
import { ApiService } from '../../../../shared/services/api/api.service';
import { AppStoreService } from '../../../../shared/services/store/app-store.service';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { IndexedDbService } from '../../../../shared/services/storage/indexed-db.service';
import { Router } from '@angular/router';
import { SignInComponent } from '../../components/sign-in/sign-in.component';

@Component({
  selector: 'app-admin-sign-in',
  standalone: true,
  imports: [
    SignInComponent
  ],
  templateUrl: './admin-sign-in.component.html',
  styleUrl: './admin-sign-in.component.scss'
})
export class AdminSignInComponent {

  public _apiService = inject(ApiService);
  public _toastService = inject(ToastService);
  public _appStoreService = inject(AppStoreService);
  private _indexedDbService = inject(IndexedDbService)
  private _router: Router = inject(Router);

  onFormSubmit(event: any): void {
    this._apiService.adminSignIn(event).subscribe((res: any) => {
      this._indexedDbService.addItem({id: 'token', user_type: "admin" , value: res.auth_token,  description: 'admin sign in auth token', encryption: true}).then(() => {
        this._toastService.success({message: `Welcome back ${res.email} `, autoClose: true, title: 'Signed in successfully!'});
        this._router.navigate(["/admin/outlets"]);
      }).catch((error) => {
        console.error(error)
      })
    })
  }
}
