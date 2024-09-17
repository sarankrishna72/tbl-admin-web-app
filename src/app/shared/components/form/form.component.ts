import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {ChildFormInterfaceModel, FormAction, FormConfig } from '../../../core/model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { InputComponent, InputFileComponent, InputSelectComponent } from './components';
import { ButtonComponent } from '..';
import { FormActionsComponent } from './components/form-actions/form-actions.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    InputFileComponent,
    ReactiveFormsModule,
    InputSelectComponent,
    FormActionsComponent,
    CommonModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnChanges {
  @Input() formData!: FormConfig;
  @Input() data: any;
  @Input() formGroup: FormGroup = new FormGroup({});
  @Output() formOutput: EventEmitter<any> = new EventEmitter();
  @Output() onFormGroupReady: EventEmitter<any> = new EventEmitter();
  @Input() showFormActions: boolean = true;
  /**
   * Generate Form Control Configuration
   *
   * @memberof FormComponent
   */
  generateFormGroupControls() {
    let { controls, actions } : FormConfig = this.formData;
    controls = _.orderBy(controls, ['order'],['asc']);
    for (const formQuestion of controls) {
      const control = new FormControl(formQuestion.value ||  this.data[formQuestion.key] || '' ) as FormControl<any>;
      this.formGroup.addControl(formQuestion.key, control )
    }
    this.onFormGroupReady.emit(this.formGroup);
  }

  formAction(action: any) {
    this.formOutput.emit(action);
  }





  checkFormSubChildsInstance(items: any, formQuestions:any): any{
    if (items?.length > 0 && this.formGroup?.value) {
      if (items[0] instanceof ChildFormInterfaceModel) {
        let formItems = items.find((child: any) => child.conditionValue  == this.formGroup?.value?.[formQuestions.key])
        if (formItems) {
          return formItems.items;
        }
        return [];
      } else if (this.formGroup?.value?.[formQuestions.key]) {
        return items;
      }
      return [];
    }
    return [];
  }

  renderSubFormCompleted(event: any, formKey: string) {
    console.log("renderSubFormCompleted");
    let obj: any = {}
    if (event.length > 0) {
      for (const key of event) {
        obj[key] = this.data[key] || null;
      }
      this.formGroup.patchValue(obj)
    }
  }

  /**
   * Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
   * Add '${implements OnChanges}' to the class.
   *
   * @param {SimpleChanges} changes
   * @memberof FormComponent
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formData'] && changes['formData'].currentValue) {
      if (this.formData.controls.length > 0) {
        this.generateFormGroupControls();
      }
    }
  }

}
