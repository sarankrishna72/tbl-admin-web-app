import { Component, inject, Input } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { ButtonComponent } from '..';
import { DEFAULT_IMAGES } from '../../../core/constants';
import { AppStoreService } from '../../services/store/app-store.service';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [
    TitleComponent,
    ButtonComponent,
  ],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  @Input() pageTitle: string = '';
  _appStoreService: AppStoreService = inject(AppStoreService)
  staticImages: any = DEFAULT_IMAGES;

}
