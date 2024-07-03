import { Component } from '@angular/core';
import { FormBase } from '../../../core/model/form.model';
import { DEFAULT_IMAGES } from '../../../core/constants';
import { SIGN_IN_FORM_DATA } from '../../../core/configurations/forms';
import { FormComponent } from '../../../shared/components/form/form.component';
import { ButtonComponent } from '../../../shared/components/form/components/button/button.component';
import { TitleComponent } from '../../../shared/components/title/title.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormComponent,
    ButtonComponent,
    TitleComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  staticImages: any = DEFAULT_IMAGES;
  formConfigs: FormBase[]= SIGN_IN_FORM_DATA;
}
