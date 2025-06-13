import { Component, inject, Input } from '@angular/core';
import { TitleComponent } from '../title/title.component';
import { DEFAULT_IMAGES } from '../../../core/constants';
import { AppStoreService } from '../../services/store/app-store.service';
import { ButtonComponent } from '../form/components/button/button.component';

@Component({
    selector: 'app-page-header',
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
