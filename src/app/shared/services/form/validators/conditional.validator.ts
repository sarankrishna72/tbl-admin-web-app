import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormBaseControlValidator, ValidatorsType } from '../../../../core/model';

export function conditionalValidator(validation: FormBaseControlValidator): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control.parent;
    if (!form) return null;

    const dependentField = form.get(validation.conditions?.fieldName || '');
    if (!dependentField) return null;
    dependentField.valueChanges.subscribe(() => {
        control?.updateValueAndValidity();
    });
    const { value, operator } = validation.conditions || {};
    if (!value || !operator) return null;

    const dependentValue = Number(dependentField.value);
    let requiresValidation = false;

    switch (operator) {
      case '>':
        requiresValidation = dependentValue > value;
        break;
      case '<':
        requiresValidation = dependentValue < value;
        break;
      case '>=':
        requiresValidation = dependentValue >= value;
        break;
      case '<=':
        requiresValidation = dependentValue <= value;
        break;
      case '==':
        requiresValidation = dependentValue === value;
        break;
      case 'between':
        if (Array.isArray(value) && value.length === 2) {
          requiresValidation = dependentValue > value[0] && dependentValue < value[1];
        }
        break;
    }

    if (requiresValidation) {
      return !control.value ? { [ValidatorsType.CONDITIONAL_REQUIRED]: true } : null;
    }

    return null;
  };
}