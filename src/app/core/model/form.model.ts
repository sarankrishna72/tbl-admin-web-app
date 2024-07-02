import { Observable } from "rxjs/internal/Observable";

export class FormBase {
  value: any;
  key: string;
  label: string;
  order: number;
  controlType: string;
  type: string;
  placeholder ?: string;
  options: { key: string, value: string }[];
  api: Observable<any> | null;
  validations: FormBaseControlValidator[] = [];
  success_icon ?: string = '';
  error_icon ?: string = '';
  icon ?: string = '';
  helpText?: string = '';
  showValidationIcon ?: boolean = false;
  constructor(options: {
    value?: any;
    key?: string;
    label?: string;
    order?: number;
    controlType?: string;
    type?: string;
    options?: { key: string, value: string }[];
    api ?: Observable<any>;
    placeholder ?: string;
    helpText ?: string;
    validations ?: FormBaseControlValidator[];
    error_icon ?: string;
    success_icon ?: string;
    icon ?: string;
    showValidationIcon ?: boolean
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
    this.api = options.api || null;
    this.validations = options.validations || [];
    this.placeholder = options.placeholder || "";
    this.helpText = options.helpText || "";
    this.error_icon = options.error_icon || "";
    this.success_icon = options.success_icon || "";
    this.icon = options.icon || "";
    this.showValidationIcon = options.showValidationIcon || false;
  }
}


export class FormBaseControlValidator{
  validatorName: ValidatorsType | null ;
  message: string;
  validatorValue: any | null;
  constructor(options: {
    validatorName ?: ValidatorsType;
    message ?: string;
    validatorValue ?: any | null;
  } = {}) {
    this.validatorName = options.validatorName || null;
    this.message = options.message || 'Enter a valid input';
    this.validatorValue = options.validatorValue || null;
  }
}


export class InputTextField extends FormBase {
  override controlType = 'textfield';
}

export class InputDropdown extends FormBase {
  override controlType = 'dropdown';
}


export enum ValidatorsType {
  REQUIRED = "required",
  MAX_LENGTH = "maxLength",
  MIN_LENGTH = "minLength",
  PATTERN = "pattern",
  MIN = "min",
  MAX = "max",
  NULL_VALIDATOR = "nullValidator",
  EMAIL = "email"
}
