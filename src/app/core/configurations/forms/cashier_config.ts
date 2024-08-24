import { API_URI } from "../../constants/api_uri";
import { FormBaseControlValidator, FormConfig, InputDropdown, InputFile, InputTextField, ValidatorsType,  } from "../../model";


export const CASHIER_FORM_DATA: FormConfig = new FormConfig(
  {
   controls: [
      new InputDropdown({
        key: "restaurant_id",
        value: "",
        type: "text",
        label: "Restaurant",
        order:0,
        api: {
          apiUrl: API_URI.restaurantsListURI,
          method: "get"
        },
        placeholder: "Enter Restaurant",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true })
        ]
      }),
      new InputTextField({
        key: "name",
        value: "",
        type: "text",
        label: "Cashier Name",
        order:1,
        placeholder: "Enter Cashier Name",
        validations: [
        ]
      }),
      new InputTextField({
        key: "phone_number",
        value: "",
        type: "text",
        label: "Front Desk Contact Number",
        order: 3,
        prefix: "+91",
        placeholder: "Enter Contact Number",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
          new FormBaseControlValidator({validatorName: ValidatorsType.PATTERN,message: "Invalid mobile number", validatorValue: "[6789][0-9]{9}"}),
        ]
      }),
      new InputTextField({
        key: "email",
        value: "",
        type: "email",
        label: "Email Address",
        order:2,
        placeholder: "Enter Email ID",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
          new FormBaseControlValidator({validatorName: ValidatorsType.EMAIL,message: "Enter Valid Email", validatorValue: true })
        ]
      }),

      new InputTextField({
        key: "password",
        value: "",
        type: "password",
        label: "Password",
        order:3,
        placeholder: "Enter Password",
        validations: [
        ]
      }),

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
