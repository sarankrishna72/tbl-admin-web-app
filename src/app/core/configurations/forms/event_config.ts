import { API_URI } from "../../constants/api_uri";
import { FormBaseControlValidator, FormConfig, InputDropdown, InputFile, InputTextField, ValidatorsType,  } from "../../model";

export const EVENT_FORM_DATA: FormConfig = new FormConfig(
  {
   controls: [
      new InputDropdown({
        key: "restaurant_id",
        value: "",
        type: "text",
        label: "Select Outlet",
        order:1,
        api: {
          apiUrl: API_URI.restaurantsListURI,
          method: "get"
        },
        placeholder: "Select Outlet",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true })
        ]
      }),
      new InputTextField({
        key: "title",
        value: "",
        type: "text",
        label: "Title",
        order:2,
        placeholder: "Enter Title",
        helpText: "Title must be 20 characters or less",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
          new FormBaseControlValidator({validatorName: ValidatorsType.MAX_LENGTH,message: "Title must be 20 characters or less", validatorValue: 20 })
        ]
      }),
      new InputTextField({
        key: "description",
        value: "",
        type: "text",
        label: "Description",
        order:3,
        placeholder: "Enter Description",
        helpText: "Description must be 50 characters or less",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
          new FormBaseControlValidator({validatorName: ValidatorsType.MAX_LENGTH,message: "Description must be 50 characters or less", validatorValue: 50 })
        ]
      }),
      new InputFile({
        key: "photos",
        value: "",
        label: "Event Image",
        order: 4,
        placeholder: "Enter Outlet Image",
        helpText: "Image file must be 20MB or less",
        multiple: false,
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true })
        ]
      }),

      new InputTextField({
        key: "event_date",
        value: "",
        type: "datetime-local",
        label: "Event Date",
        order: 5,
        placeholder: "Enter Event Date",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
        ]
      }),
      new InputTextField({
        key: "notification_push_date",
        value: "",
        type: "datetime-local",
        label: "Notification Date",
        order: 6,
        placeholder: "Enter Notification Date",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
        ]
      }),
      new InputDropdown({
        key: "redirection_link",
        value: "",
        type: "text",
        label: "Redirection link",
        order: 7,
        placeholder: "Select Redirection Link",
         api: {
          apiUrl: API_URI.eventsRedirectionListURI,
          method: "get"
        },
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
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
  }
)
