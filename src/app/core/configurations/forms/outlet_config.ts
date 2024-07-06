import { FormBaseControlValidator, FormConfig, InputTextField, ValidatorsType,  } from "../../model";


export const OUTLET_FORM_DATA: FormConfig = new FormConfig(
  {
   controls: [
      new InputTextField({
        key: "name",
        value: "",
        type: "text",
        label: "Outlet Name",
        order:1,
        placeholder: "Enter Outlet Name",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true })
        ]
      }),
      new InputTextField({
        key: "city",
        value: "",
        type: "text",
        label: "City",
        order:2,
        placeholder: "Enter City",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true })
        ]
      }),
      new InputTextField({
        key: "area",
        value: "",
        type: "text",
        label: "Area",
        order:3,
        placeholder: "Enter Area",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true })
        ]
      }),
      new InputTextField({
        key: "image",
        value: "",
        type: "text",
        label: "Outlet Image",
        order:4,
        placeholder: "Enter Outlet Image",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true })
        ]
      })
    ],
    actions: [
      {
        actionType: "submit",
        label: "Create",
        buttonTheme: 'primary',
        buttonType: "submit",
        classes: ''
      }
    ]
  })
