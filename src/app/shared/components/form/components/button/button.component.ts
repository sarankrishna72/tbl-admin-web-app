import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ButtonTheme, ButtonRadius, Size, ButtonType } from '../../../../../core/constants/types';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnChanges,OnInit {
  @Input() buttonType: ButtonType = 'button';
  @Input() buttonTheme: ButtonTheme = 'primary';
  @Input() buttonRadius : ButtonRadius = 'md';
  @Input() buttonSize : Size = 'lg';
  @Input() classes: string = ' '
  @Input() style: any = {}
  @Input() rounded: boolean = true;
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = true;
  @Output() onClick: EventEmitter<any> = new EventEmitter();


  generateClasses() {
    this.classes += ` ${this.getThemeClasses()} ${this.getButtonSize()} ${this.generateButtonRadius()} ${this.fullWidth ? 'w-full' : ' '}`
  }


  generateButtonRadius() {
    switch (this.buttonRadius) {
      case 'md':
        return ' rounded-md';
      case 'sm':
        return ' rounded-sm';
      case 'xs':
        return ' rounded';
      case 'lg':
        return ' rounded-lg';
      case 'xl':
        return ' rounded-xl';
      default:
        return ' rounded';
    }
  }

  buttonClickCTA() {
    this.onClick.emit("click");
  }

  getThemeClasses() {
    switch (this.buttonTheme) {
      case 'primary':
        return ' bg-primary-500 hover:bg-primary-600 text-white  border border-primary-500 ';
      case 'primary-outlined':
        return ' border border-primary-700 hover:border-primary-500 hover:bg-primary-500 hover:!text-white text-primary-700 hover:text-primary-500';
      case 'secondary':
        return ' secondary-button text-white  border ';
      case 'secondary-outlined':
        return ' border  secondary-outlined bg-white';
      default:
        return '';
    }
  }

  getButtonSize() {
    switch (this.buttonSize) {
      case 'md':
        return ' py-3 px-5 text-md';
      case 'sm':
        return ' py-2 px-4 text-sm';
      case 'xs':
        return ' py-1 px-3 text-xs';
      case 'lg':
        return ' py-4 px-6 text-lg';
      case 'xl':
        return ' py-5 px-7 text-xl';
      default:
        return ' py-1 px-3 text-base';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.generateClasses();
    }
  }

  ngOnInit() {
   this.generateClasses();
  }

}

