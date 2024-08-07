import { Observable } from "rxjs/internal/Observable";
import { ButtonRadius, ButtonTheme, ButtonType, Size } from "../constants/types";

export class FormBase {
  value: any;
  key: string;
  label: string;
  order: number;
  controlType: string;
  type: string;
  placeholder ?: string;
  options: { key: string, value: string }[];
  api ?: ApiConfigInterface | null;
  validations: FormBaseControlValidator[] = [];
  success_icon ?: string = '';
  error_icon ?: string = '';
  icon ?: string = '';
  multiple ?: boolean = false;
  helpText?: string = '';
  showValidationIcon ?: boolean = false;
  rows ?: number = 4;
  cols ?: number = 50;
  resize ?: boolean = false;
  constructor(options: {
    value?: any;
    key?: string;
    label?: string;
    order?: number;
    controlType?: string;
    type?: string;
    options?: { key: string, value: string }[];
    api ?: ApiConfigInterface;
    placeholder ?: string;
    helpText ?: string;
    validations ?: FormBaseControlValidator[];
    error_icon ?: string;
    success_icon ?: string;
    icon ?: string;
    showValidationIcon ?: boolean;
    multiple ?: boolean;
    rows ?: number;
    cols ?: number;
    resize ?: boolean;
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
    this.multiple = options.multiple || false;
    this.rows = options.rows || 4;
    this.cols = options.cols || 50;
    this.resize = options.resize || false;
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

export class FormConfig {
  controls : FormBase[]  = [];
  actions: FormAction[] = [];
   constructor(options: {
    controls : FormBase[];
    actions : FormAction[];
  }) {
    this.controls = options.controls || [];
    this.actions = options.actions || [];
  }
}


export interface FormAction {
  actionType: formActionTypes;
  label : string;
  buttonConfig ?: ButtonConfig;
}

interface ButtonConfig {
  buttonType: ButtonType;
  buttonTheme: ButtonTheme ;
  buttonRadius ?: ButtonRadius;
  buttonSize ?: Size;
  classes ?: string;
  style ?: any;
  rounded ?: boolean;
  fullWidth ?: boolean;
}

export class InputTextField extends FormBase {
  override controlType = 'textfield';
}

export class InputFile extends FormBase {
  override controlType = 'file';
}

export class InputDropdown extends FormBase {
  override controlType = 'dropdown';
}

type formActionTypes = 'submit' | 'reset' | 'cancel';

export enum ValidatorsType {
  REQUIRED = "required",
  MAX_LENGTH = "maxLength",
  MIN_LENGTH = "minLength",
  PATTERN = "pattern",
  MIN = "min",
  MAX = "max",
  NULL_VALIDATOR = "nullValidator",
  EMAIL = "email",
  MAX_FILE_SIZE = "maxFileSize"
}


interface ApiConfigInterface {
  apiUrl : string;
  method : string;
}
