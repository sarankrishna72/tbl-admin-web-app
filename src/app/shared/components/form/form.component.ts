import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {FormAction, FormConfig } from '../../../core/model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { InputComponent, InputFileComponent, InputSelectComponent } from './components';
import { ButtonComponent } from '..';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    InputFileComponent,
    ReactiveFormsModule,
    InputSelectComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnChanges {
  @Input() formData!: FormConfig;
  @Input() formGroup: FormGroup = new FormGroup({});
  @Output() formOutput: EventEmitter<any> = new EventEmitter();
  @Output() onFormGroupReady: EventEmitter<any> = new EventEmitter();
  /**
   * Generate Form Control Configuration
   *
   * @memberof FormComponent
   */
  generateFormGroupControls() {
    let { controls, actions } : FormConfig = this.formData;
    controls = _.orderBy(controls, ['order'],['asc']);
    for (const formQuestion of controls) {
      const control = new FormControl(formQuestion.value || '') as FormControl<any>;
      this.formGroup.addControl(formQuestion.key, control )
    }
    this.onFormGroupReady.emit(this.formGroup);
  }

  formAction(action: FormAction) {
    switch (action.actionType) {
      case "reset":
        this.formGroup.reset();
        this.formGroup.updateValueAndValidity();
        break;
      case "submit":
        if (this.formGroup.valid) {
          this.formOutput.emit({action: action.actionType, value: this.formGroup.value});
        } else {
          this.formGroup.markAllAsTouched();
        }
        break;
      default:
        this.formOutput.emit({action: action.actionType});
        break;
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
