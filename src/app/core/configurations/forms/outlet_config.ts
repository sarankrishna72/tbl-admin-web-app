import { API_URI } from "../../constants/api_uri";
import { FormBaseControlValidator, FormConfig, InputDropdown, InputFile, InputTextField, ValidatorsType,  } from "../../model";


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
      new InputDropdown({
        key: "city",
        value: "",
        type: "text",
        label: "City",
        order:2,
        api: {
          apiUrl: API_URI.citiesURI,
          method: "get"
        },
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
      new InputFile({
        key: "image",
        value: "",
        type: "text",
        label: "Outlet Image",
        order:4,
        placeholder: "Enter Outlet Image",
        helpText: "Image file must be 20MB or less",
        multiple: false,
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true })
        ]
      })
    ],
    actions: [
      {
        actionType: "submit",
        label: "Create",
        buttonConfig: {
          buttonTheme: 'primary',
          buttonSize: 'sm',
          buttonType: 'submit',
          style: {"font-family": "roboto-regular"},
          classes: '!text-base'
        }
      }
    ]
  })
