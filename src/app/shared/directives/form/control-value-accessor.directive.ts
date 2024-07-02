import { Directive, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { FormBaseControlValidator } from '../../../core/model';

@Directive({
  selector: '[appControlValueAccessor]',
  standalone: true
})
export class ControlValueAccessorDirective  implements OnInit, ControlValueAccessor{

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  disabled: boolean = false;

  constructor( @Self()  public controlDir: NgControl) {
    controlDir.valueAccessor = this;
  }


  ngOnInit(): void {



  }

  writeValue(value: any): void {
    value && this.controlDir.control?.setValue(value, { emitEvent: false });
  }

  registerOnChange(onChange: (value: any) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }


}
