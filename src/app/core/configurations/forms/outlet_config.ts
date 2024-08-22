import { API_URI } from "../../constants/api_uri";
import { FormBaseControlValidator, FormConfig, InputDropdown, InputFile, InputTextField, ValidatorsType,  } from "../../model";


export const OUTLET_FORM_DATA: FormConfig = new FormConfig(
  {
   controls: [
      new InputTextField({
        key: "is_new_restaurant",
        value: false,
        type: "checkbox",
        label: "New Outlet ?",
        order:1,
        placeholder: "",
        validations: [
        ]
      }),
      new InputTextField({
        key: "restaurant_name",
        value: "",
        type: "text",
        label: "Outlet Name",
        order:2,
        placeholder: "Enter Outlet Name",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true })
        ]
      }),

      new InputDropdown({
        key: "city_id",
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
        key: "address",
        value: "",
        type: "textarea",
        rows: 4,
        cols: 50,
        resize: false,
        label: "Address",
        order:3,
        placeholder: "Enter Address",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
        ]
      }),
      new InputFile({
        key: "photos",
        value: "",
        label: "Outlet Image",
        order: 5,
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
