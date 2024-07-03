import { Component, Input, OnInit } from '@angular/core';
import { Size, Theme } from '../../../core/constants/types';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent implements OnInit{
  @Input() classes: string = '';
  @Input() theme: Theme = 'primary';
  @Input() size: Size = 'lg';


  getClasses() {
    this.classes += ` ${this.getSizeClass()} ${this.getThemeClass()}`
  }

  getThemeClass() {
    switch (this.theme) {
      case 'primary':
        return 'text-primary-700';
      case 'secondary':
        return 'text-primary-800';
      case 'tertiary':
        return 'text-primary-500';
      default:
        return ' ';
    }
  }


  getSizeClass() {
     switch (this.size) {
      case 'md':
        return 'text-md';
      case 'sm':
        return 'text-sm';
      case 'xs':
        return 'text-xs';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      case 'xxl':
        return 'text-xxl';
      default:
        return ' ';
    }
  }

  /**
   * Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   * Add 'implements OnInit' to the class.
   * @memberof TitleComponent
   */
  ngOnInit(): void {
    this.getClasses();
  }
}
