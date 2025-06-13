import { Component, Input, Output, EventEmitter} from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { FormGroup } from '@angular/forms';
import { FormAction } from '../../../../../core/model';

@Component({
    selector: 'app-form-actions',
    imports: [
        ButtonComponent
    ],
    templateUrl: './form-actions.component.html',
    styleUrl: './form-actions.component.scss'
})
export class FormActionsComponent {
  @Input() actions: any[] = [];
  @Input() formGroup!: FormGroup;
  @Output() formAction: EventEmitter<any> = new EventEmitter();

  buttonCTA(action: FormAction): void {
    switch (action.actionType) {
      case "reset":
        this.formGroup.reset();
        this.formGroup.updateValueAndValidity();
        break;
      case "submit":
        if (this.formGroup.valid) {
          this.formAction.emit({action: action.actionType, value: this.formGroup.value});
        } else {
          this.formGroup.markAllAsTouched();
        }
        break;
      default:
        this.formAction.emit({action: action.actionType});
        break;
    }
  }

}
