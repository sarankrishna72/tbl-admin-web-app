import { ApiService } from './../../../shared/services/api/api.service';
import { Component, inject } from '@angular/core';
import { FormConfig } from '../../../core/model/form.model';
import { DEFAULT_IMAGES } from '../../../core/constants';
import { SIGN_IN_FORM_DATA } from '../../../core/configurations/forms';
import { FormComponent } from '../../../shared/components/form/form.component';
import { ButtonComponent } from '../../../shared/components/form/components/button/button.component';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { AppStoreService } from '../../../shared/services/store/app-store.service';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IndexedDbService } from '../../../shared/services/storage/indexed-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormComponent,
    ButtonComponent,
    TitleComponent,
    NgOptimizedImage ,
    CommonModule
  ],

  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  staticImages: any = DEFAULT_IMAGES;
  formConfigs: FormConfig = SIGN_IN_FORM_DATA;
  public _apiService = inject(ApiService);
  public _toastService = inject(ToastService);
  public _appStoreService = inject(AppStoreService);
  private _indexedDbService = inject(IndexedDbService);
  private _router: Router = inject(Router);
  /**
   * Submit the Sign in form to the application
   *
   * @param {*} event
   * @memberof SignInComponent
   */
  onFormSubmit(event: any) {
    this._apiService.adminSignIn(event.value).subscribe((res: any) => {
      this._indexedDbService.addItem({id: 'token', value: res.auth_token,  description: 'admin sign in auth token', encryption: true}).then(() => {
        this._toastService.success({message: `Welcome back ${res.email} `, autoClose: true, title: 'Signed in successfully!'});
        this._router.navigate(["/outlets"]);
      }).catch((error) => {
        console.error(error)
      })
    })
  }

}
