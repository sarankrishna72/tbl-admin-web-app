import { DEFAULT_IMAGES } from './../../../core/constants/image';
import { Component } from '@angular/core';
import { InputComponent } from '../../../shared/form/components/input/input.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    InputComponent
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  staticImages: any = DEFAULT_IMAGES;
}
