import { Component } from '@angular/core';
import { FormBase } from '../../../core/model/form.model';
import { ButtonComponent, FormComponent, DEFAULT_IMAGES } from '../../../core/constants';
import { SIGN_IN_FORM_DATA } from '../../../core/configurations/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormComponent,
    ButtonComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  staticImages: any = DEFAULT_IMAGES;
  formConfigs: FormBase[]= SIGN_IN_FORM_DATA;
}
