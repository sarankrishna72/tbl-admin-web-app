import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent, ToastComponent } from './shared/components';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { AppStoreService } from './shared/services/store/app-store.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 _appStoreService: AppStoreService = inject(AppStoreService);
  constructor() {
    injectSpeedInsights();
  }
}
