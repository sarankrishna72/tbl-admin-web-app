import { FormBase, FormBaseControlValidator, InputTextField, ValidatorsType,  } from "../../model";

export const SIGN_IN_FORM_DATA: FormBase[] = [
  new InputTextField({
    key: "email",
    value: "",
    type: "text",
    label: "Email Address",
    order:1,
    placeholder: "Enter your email address...",
    helpText: "Helper text goes here",
    validations: [
      new FormBaseControlValidator({validatorName: ValidatorsType.EMAIL,message: "Please Enter a valid Email", validatorValue: true }),
      new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true })
    ]
  }),
  new InputTextField({

    key: "password",
    value: "",
    type: "password",
    label: "Password",
    order:2,
    placeholder: "Enter your password...",
    validations: [
      new FormBaseControlValidator({validatorName: ValidatorsType.MIN_LENGTH,message: "Please Enter at least 5 characters", validatorValue: 5 }),
      new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true })
    ]
  })
]
