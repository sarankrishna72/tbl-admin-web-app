import { DEFAULT_IMAGES } from './../../core/constants/image';
import { Component, inject } from '@angular/core';
import { MainContainerComponent } from '../../shared/components/main-container/main-container.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { ButtonComponent } from '../../shared/components/form/components/button/button.component';
import { AppStoreService } from '../../shared/services/store/app-store.service';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MainContainerComponent,
    TitleComponent,
    ButtonComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  staticImages:any =  DEFAULT_IMAGES;
  public _appStoreService = inject(AppStoreService)
}
