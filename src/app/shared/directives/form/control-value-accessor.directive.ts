import { ChildFormInterfaceModel, FormConfig } from './../../../core/model/form.model';
import { Directive, EventEmitter, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { FormBase } from '../../../core/model';
import { Observable, pairwise, startWith } from 'rxjs';
import { HttpService } from '../../services/http/http.service';

@Directive({
  selector: '[appControlValueAccessor]',
  standalone: true
})
export class ControlValueAccessorDirective  implements  ControlValueAccessor {
  @Output() renderSubFormCompleted: EventEmitter<any> = new EventEmitter();
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};
  disabled: boolean = false;

  constructor( @Self()  public controlDir: NgControl, public _httpService: HttpService) {
    controlDir.valueAccessor = this;
  }


  writeValue(value: any): void {
    if (value !== this.controlDir.control?.value) {
      this.controlDir.control?.setValue(value, { emitEvent: false });
    }
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

  generateSubFormsControls(items: any, formGroup: FormGroup) {
    for (const formItem of items) {
      formGroup.addControl(formItem.key, new FormControl(""))
    }
  }

  callApiData(formConfig: any) {
    switch (formConfig.api?.method) {
      case "get":
        return this._httpService.get(formConfig.api.apiUrl)
      default:
        return new Observable();
    }
  }

  generateSubForms(formConfig: FormBase, formGroup: FormGroup) {
    if (formConfig.sub_childs![0] instanceof ChildFormInterfaceModel) {
      let item:any = formConfig.sub_childs!.find((child: any) => child.conditionValue ==  this.controlDir.control?.value )
      if (item) {
        this.generateSubFormsControls(item.items, formGroup)
        this.renderSubFormCompleted.emit(item.items.map((x: any) => x.key))
      }
      return;
    }
    this.generateSubFormsControls(formConfig.sub_childs, formGroup)
    this.renderSubFormCompleted.emit(formConfig.sub_childs!.map((x: any) => x.key))
  }

  removeFormControls(items: any, formGroup: FormGroup) {
    for (const formContrl of items) {
      formGroup.removeControl(formContrl.key)
    }
  }

  removePreviousFormControls(prevValue: any, formConfig: any, formGroup: any) {
    if (formConfig.sub_childs![0] instanceof ChildFormInterfaceModel) {
      let item:any = formConfig.sub_childs!.find((child: any) => child.conditionValue ==  prevValue );
      if ((item && prevValue) || (item && prevValue && !this.controlDir.control?.value)) {
        this.removeFormControls(item.items, formGroup)
      }
      return;
    }

    if (prevValue && !this.controlDir.control?.value) {
       this.removeFormControls(formConfig.sub_childs, formGroup)
    }
  }


  formValueChanges(formConfig: FormBase, formGroup: FormGroup) {
    formGroup.get(formConfig.key)?.valueChanges.pipe(startWith(null), pairwise()).subscribe(([prev, next]: [any, any]) => {
      if (prev !== next) {
        setTimeout(() => {
          if (prev || !next) {
            this.removePreviousFormControls(prev,formConfig, formGroup)
          }
          if (next && formConfig.sub_childs!?.length > 0) {
            this.generateSubForms(formConfig, formGroup)

          }
        }, 200);
      }
    })

  }

}
