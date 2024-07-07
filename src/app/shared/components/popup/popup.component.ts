import { Component, Input } from '@angular/core';
import { PopupConfigInterface } from '../../../core/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  @Input() containerClass: string = '';
  @Input() title: string = '';
  @Input() titleClass: string = '';
  @Input() popupConfig ?: PopupConfigInterface;
}
