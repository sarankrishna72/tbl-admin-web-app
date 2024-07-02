import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

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
  @Input() buttonType: string = 'button';
  @Input() buttonTheme: ButtonTheme = 'primary';
  @Input() buttonRadius : ButtonRadius = 'md';
  @Input() buttonSize : ButtonSize = 'lg';
  @Input() classes: string = ' '
  @Input() style: any = {}
  @Input() rounded: boolean = true;
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
        return 'bg-primary-500 hover:bg-primary-600 text-white text-sm border border-primary-500 '
      case 'primary-outlined':
        return 'border border-primary-800 hover:border-primary-500 text-sm text-primary-800 hover:text-primary-500'
      default:
        return '';
    }
  }

  getButtonSize() {
    switch (this.buttonSize) {
      case 'md':
        return 'h-11 py-2 px-5';
      case 'sm':
        return 'h-10 py-1 px-5';
      case 'xs':
        return 'h-9 py-2 px-5';
      case 'lg':
        return 'h-12 py-3 px-6';
      case 'xl':
        return 'h-13 py-4 px-7';
      default:
        return 'h-10  py-1 px-5';
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

type ButtonTheme = 'primary' | 'secondary' | 'primary-outlined' | 'secondary-outlined';
type ButtonSize = 'md' | 'sm' | 'xs' | 'lg' | 'xl';
type ButtonRadius = 'md' | 'sm' | 'xs' | 'lg' | 'xl' | 'full';
