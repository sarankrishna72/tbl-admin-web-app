import { Injectable } from '@angular/core';
import { FormBaseControlValidator, ValidatorsType } from '../../../core/model';
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { formUploadTypeValidator, maxFileSizeValidator, conditionalValidator} from './validators/custom-validators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  generateValidator(validation: FormBaseControlValidator) {
    switch (validation.validatorName) {
      case ValidatorsType.REQUIRED:
        return Validators.required;
      case ValidatorsType.PATTERN:
        return Validators.pattern(validation.validatorValue);
      case ValidatorsType.MIN:
        return Validators.min(validation.validatorValue);
      case ValidatorsType.MAX:
        return Validators.max(validation.validatorValue);
      case ValidatorsType.MAX_LENGTH:
        return Validators.maxLength(validation.validatorValue);
      case ValidatorsType.MIN_LENGTH:
        return Validators.minLength(validation.validatorValue);
      case ValidatorsType.EMAIL:
        return Validators.email;
      case ValidatorsType.NULL_VALIDATOR:
        return Validators.nullValidator;
      case ValidatorsType.MAX_FILE_SIZE:
        return maxFileSizeValidator(parseInt(validation.validatorValue) * 1024 * 1024);
      case ValidatorsType.FILE_VALID_TYPE:
        return formUploadTypeValidator(validation.validatorValue);
      case ValidatorsType.CONDITIONAL_REQUIRED:
        return conditionalValidator(validation);
      default:
        return null;
    }
  }

  checkRequiredField(validations: FormBaseControlValidator[]) {
    let requiredValidation = validations.find(validation => 
      validation.validatorName === ValidatorsType.REQUIRED
    );
    return requiredValidation ? true : false;
  }
}
