import moment from "moment";
import { API_URI } from "../../constants/api_uri";
import { ChildFormInterfaceModel, FormBaseControlValidator, FormConfig, InputDropdown, InputFile, InputTextField, ValidatorsType,  } from "../../model";

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
        helpText: "Image file must be 1MB or less",
        multiple: false,
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
          new FormBaseControlValidator({validatorName: ValidatorsType.FILE_VALID_TYPE, message: "Invalid file type. Please upload an image.", validatorValue: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'] }),
          new FormBaseControlValidator({validatorName: ValidatorsType.MAX_FILE_SIZE, message: "File size must be 1MB or less", validatorValue: 1 }),
        ]
      }),

      new InputTextField({
        key: "event_date",
        value: "",
        type: "datetime-local",
        label: "Event Date & Time",
        inputConfig: {
          min: moment(new Date()).add(1, "day").format("YYYY-MM-DDTHH:mm:ss")
        },
        order: 5,
        placeholder: "Enter Event Date",
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
        ]
      }),
      new InputTextField({
        key: "redirection_type",
        type: "radio",
        label: "Select App Screen",
        order: 7,
        sub_childs: [
          new ChildFormInterfaceModel({
            conditionValue: "App Screen",
            items: [
              new InputDropdown({
                key: "redirection_link",
                value: "",
                type: "text",
                label: "Redirection link",
                order: 8,
                placeholder: "Select Redirection Link",
                api: {
                  apiUrl: API_URI.eventsRedirectionListURI,
                  method: "get"
                },
                validations: [
                  new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
                ]
              })
            ]
          }),
          new ChildFormInterfaceModel({
            conditionValue: "Link",
            items: [
              new InputTextField({
                key: "redirection_link",
                value: "",
                type: "text",
                label: "Redirection link",
                order: 8,
                placeholder: "Enter Redirection Link for Zomato / Swiggy etc.",
                validations: [
                  new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
                ]
              })
            ]
          })
        ],
        options: [

        ],
        api: {
          apiUrl: API_URI.eventsRedirectionTypesURI,
          method: "get"
        },
        validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
        ]
      }),
      new InputTextField({
        key: "send_immediate_notification",
        type: "radio",
        label: "Send Notification Now?",
        order: 7,
        options: [
          {
            name: "Yes",
            id: "yes",
          },{
            name: "No",
            id: "no",
          }
        ],
        sub_childs: [
          new ChildFormInterfaceModel({
            conditionValue: "no",
            items: [
              new InputTextField({
                key: "notification_push_date",
                value: "",
                type: "datetime-local",
                inputConfig: {
                  min: moment(new Date()).add(1, "day").format("YYYY-MM-DDTHH:mm:ss")
                },
                label: "Scheduled Date & Time",
                order: 6,
                placeholder: "Enter Scheduled Date & Time",
                validations: [
                  new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
                ]
              })
            ]
          }),
        ],
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
