import { Injectable } from '@angular/core';
import { FormBaseControlValidator, ValidatorsType } from '../../../core/model';
import { Validators } from '@angular/forms';
import { FormUploadTypeValidator, MaxSizeValidator} from './validators/custom-validators';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

    /**
   * Generate the form Validtors
   *
   * @param {FormBaseControlValidator} validation
   * @return {*}
   * @memberof FormService
   */
  generateValidator(validation: FormBaseControlValidator) {
   switch (validation.validatorName) {
    case "required":
      return Validators.required;
    case "pattern":
      return Validators.pattern(validation.validatorValue);
    case "min":
      return Validators.min(validation.validatorValue);
    case "max":
      return Validators.max(validation.validatorValue);
    case "maxLength":
      return Validators.maxLength(validation.validatorValue);
    case "minLength":
      return Validators.minLength(validation.validatorValue);
    case "email":
      return Validators.email
    case "nullValidator":
      return Validators.nullValidator;
    case "maxFileSize":
      return MaxSizeValidator(parseInt(validation.validatorValue) * 1024 * 1024)
    case "fileValidType":
      return FormUploadTypeValidator(validation.validatorValue)
    default:
      return null;
   }
  }


  checkRequiredField(validations: FormBaseControlValidator[]) {
    let requiredValidation = validations.find(validation => validation.validatorName == ValidatorsType.REQUIRED)
    return requiredValidation ? true : false;
  }
}
