import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { FormBase } from '../../../../../core/model';
import { ControlValueAccessorDirective } from '../../../../directives/form/control-value-accessor.directive';
import { CommonModule } from '@angular/common';
import { FormService } from '../../../../services/form/form.service';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
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

  ngOnInit(): void {
    if (this.formConfig.validations.length > 0) {
      const validators = []
      for (const validation of this.formConfig.validations) {
        let controlValidator = this._formService.generateValidator(validation);
        if (controlValidator) {
          validators.push(controlValidator)
        }
      }
      if (validators.length > 0) {
        this.controlDir.control?.addValidators(validators);
        this.controlDir.control?.updateValueAndValidity();
      }
    }
  }

  onCheckboxChange(event: any) {
    console.log(event)
  }

  errorMessage(): string {
    let error = this.controlDir?.control?.errors || {};
    if ( Object.keys(error)?.length > 0) {
      let errorName = Object.keys(error)[0]
      if (errorName)
        return this.formConfig?.validations?.find(validation => validation.validatorName?.toLowerCase() === errorName)?.message || '';
    }
    return 'This field is required';
  }

  toggleEye() {
    this.isEyeOpen = !this.isEyeOpen;
    (this.isEyeOpen) ? this.formConfig.type = "text" : this.formConfig.type = "password";
  }
}
