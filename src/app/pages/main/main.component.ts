import { DEFAULT_IMAGES } from './../../core/constants/image';
import { Component, OnInit, inject, effect } from '@angular/core';
import { MainContainerComponent } from '../../shared/components/main-container/main-container.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { ButtonComponent } from '../../shared/components/form/components/button/button.component';
import { AppStoreService } from '../../shared/services/store/app-store.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { CommonService } from '../../shared/services/common/common.service';
import { CrudPageModel } from '../../core/model';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MainContainerComponent,
    TitleComponent,
    ButtonComponent,
    TableComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  staticImages:any =  DEFAULT_IMAGES;
  public _appStoreService = inject(AppStoreService)
  public _commonService = inject(CommonService)
  configurations: CrudPageModel| null = null;
  private loggingEffect = effect(() => {
    if (this._appStoreService.getCurrentPageConfig()) this.configurations = this._appStoreService.getCurrentPageConfig();
  });





  /**
   * Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   * Add 'implements OnInit' to the class.
   * @memberof MainComponent
   */
  ngOnInit(): void {
    this._commonService.getPageConfiguration()
  }
}
