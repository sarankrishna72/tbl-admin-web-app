import { Component } from '@angular/core';
import { MainContainerComponent } from '../../shared/components/main-container/main-container.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { ButtonComponent } from '../../shared/components/form/components/button/button.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MainContainerComponent,
    TitleComponent,
    ButtonComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
