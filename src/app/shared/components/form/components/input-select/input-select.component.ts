import { Component, ElementRef, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ControlValueAccessorDirective } from '../../../../directives/form/control-value-accessor.directive';
import { FormBase } from '../../../../../core/model';
import { FormService } from '../../../../services/form/form.service';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../../../services/http/http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss'
})
export class InputSelectComponent extends ControlValueAccessorDirective  implements OnInit, OnChanges, ControlValueAccessor{

  @Input() formControlName!: any;
  @Input() formConfig!: FormBase;
  value: string = '';
  isEyeOpen: boolean = false;
  @Output() blur: EventEmitter<void> = new EventEmitter<void>();
  private _formService = inject(FormService);
  private _httpService = inject(HttpService);
  options: any = [];
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

  errorMessage(): string {
    let error = this.controlDir?.control?.errors || {};
    if ( Object.keys(error)?.length > 0) {
      let errorName = Object.keys(error)[0]
      if (errorName)
        return this.formConfig?.validations?.find(validation => validation.validatorName?.toLowerCase() === errorName)?.message || '';
    }
    return 'This field is required';
  }


  getSelectApi() {
    console.log(this.formConfig.api?.method)
    switch (this.formConfig.api?.method) {
      case "get":
        return this._httpService.get(this.formConfig.api.apiUrl)
      default:
        return new Observable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    if (this.formConfig.api) {
      this.getSelectApi().subscribe((res: any) => {
        this.options = res.data || res;
      })
      // this.getSelectApi().subscribe(res => {
      //   console.log(res)
      // });
    }

  }

}
