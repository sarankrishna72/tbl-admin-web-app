import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FormBase } from '../../../../../core/model';
import { ControlValueAccessorDirective } from '../../../../directives/form/control-value-accessor.directive';
import { CommonModule } from '@angular/common';
import { FormService } from '../../../../services/form/form.service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule
  ],

  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent extends ControlValueAccessorDirective  implements OnInit, ControlValueAccessor {
  @Input() formControlName!: any;
  @Input() formConfig!: FormBase;
  value: string = '';
  isEyeOpen: boolean = false;
  @Output() blur: EventEmitter<void> = new EventEmitter<void>();
  private _formService = inject(FormService);

  override ngOnInit(): void {
    if (this.formConfig.validations.length > 0) {
      const validators = []
      for (const validation of this.formConfig.validations) {
        let controlValidator = this._formService.generateValidator(validation);
        if (controlValidator) {
          validators.push(controlValidator)
        }
      }
      if (validators.length > 0) {
        this.controlDir.control?.addValidators(validators)
      }
    }
  }

  toggleEye() {
    this.isEyeOpen = !this.isEyeOpen;
    (this.isEyeOpen) ? this.formConfig.type = "text" : this.formConfig.type = "password";
  }
}
