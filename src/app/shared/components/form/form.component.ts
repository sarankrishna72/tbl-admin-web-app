import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBase } from '../../../core/model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, InputComponent } from '../../../core/constants';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnChanges {
  @Input() formData: FormBase[] = [];
  @Input() formGroup: FormGroup = new FormGroup({});

  /**
   * Generate Form Control Configuration
   *
   * @memberof FormComponent
   */
  generateFormGroupControls() {
    for (const formQuestion of this.formData) {
      const control = new FormControl(formQuestion.value || '') as FormControl<any>;
      this.formGroup.addControl(formQuestion.key, control )
    }
  }

  submitForm() {
    console.log(this.formGroup.valid)
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
      if (this.formData.length > 0) {
        this.generateFormGroupControls();
      }
    }
  }

}
