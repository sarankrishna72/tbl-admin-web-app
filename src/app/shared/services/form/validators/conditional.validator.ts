import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ConditionLogicType, FormBaseControlValidator, ValidatorsType } from '../../../../core/model';

export function conditionalValidator(validation: FormBaseControlValidator): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control.parent;
    if (!form) return null;

    const dependentField = form.get(validation.conditions?.fieldName || '');
    if (!dependentField) return null;
    
    const { value, operator } = validation.conditions || {};
    if (!value || !operator) return null;

    const dependentValue = Number(dependentField.value);
    let requiresValidation = false;

    switch (operator) {
      case ConditionLogicType.GREATER_THAN:
        requiresValidation = dependentValue > value;
        break;
      case ConditionLogicType.LESS_THAN:
        requiresValidation = dependentValue < value;
        break;
      case ConditionLogicType.GREATER_THAN_EQUAL:
        requiresValidation = dependentValue >= value;
        break;
      case ConditionLogicType.LESS_THAN_EQUAL:
        requiresValidation = dependentValue <= value;
        break;
      case ConditionLogicType.EQUAL:
        requiresValidation = dependentValue === value;
        break;
      case ConditionLogicType.NOT_EQUAL:
        requiresValidation = dependentValue !== value;
        break;
      case ConditionLogicType.OR:
        if (Array.isArray(value) && value.length === 2) {
          requiresValidation = dependentValue == value[0] || dependentValue == value[1];
        }
        break;
      case ConditionLogicType.BETWEEN:
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