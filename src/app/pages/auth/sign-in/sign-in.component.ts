import { DEFAULT_IMAGES } from './../../../core/constants/image';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  staticImages: any = DEFAULT_IMAGES;
}
