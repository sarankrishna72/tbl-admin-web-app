import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { ControlValueAccessor, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBase } from '../../../../../core/model';
import { ControlValueAccessorDirective } from '../../../../directives/form/control-value-accessor.directive';
import { CommonModule } from '@angular/common';
import { FormService } from '../../../../services/form/form.service';
import { SafeHtmlPipe } from '../../../../../core/pipes';
import moment from 'moment';
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SafeHtmlPipe
  ],

  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent extends ControlValueAccessorDirective  implements OnInit, OnChanges, ControlValueAccessor {
  @Input() formControlName!: any;
  @Input() formConfig!: FormBase;
  @Input() data: any;
  @Input() formGroup !: FormGroup;
  value: string = '';
  isEyeOpen: boolean = false;
  @Output() blur: EventEmitter<void> = new EventEmitter<void>();
  private _formService = inject(FormService);
  isRequired: boolean = false;

  toggleEye() {
    this.isEyeOpen = !this.isEyeOpen;
    (this.isEyeOpen) ? this.formConfig.type = "text" : this.formConfig.type = "password";
  }

  checkFormControlsDate() {
    setTimeout(() => {
      let value = this.controlDir?.control?.value;
      if (this.formConfig.type.includes("date") && value) {
        this.controlDir?.control?.setValue(moment(new Date(value)).format("YYYY-MM-DDTHH:mm:ss"));
      }
    },100);
  }

   ngOnChanges(changes: SimpleChanges): void {
    if (this.formConfig.api) {
      this.callApiData(this.formConfig).subscribe((res: any) => {
        this.formConfig.options = res.data || res;
      })
    }
    this.formValueChanges(this.formConfig, this.formGroup);
  }



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

      this.checkFormControlsDate();
      this.isRequired = this._formService.checkRequiredField(this.formConfig.validations);
    }



  }


}


