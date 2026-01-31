import { ChildFormInterfaceModel, ConditionLogicType, FormBaseControlValidator, FormConfig, InputTextField, ValidatorsType } from "../../model";

export const CASHIER_CUSTOMER_FORM_DATA: FormConfig = new FormConfig(
  {
    controls: [
      new InputTextField({
        key: "phone_number",
        value: "",
        type: "text",
        label: "Customer Phone Number",
        order:1,
        prefix: "+91",
        showValidationIcon: true,
        placeholder: "Enter customer phone number",
         validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
          new FormBaseControlValidator({validatorName: ValidatorsType.PATTERN,message: "Invalid mobile number", validatorValue: "[6789][0-9]{9}"}),
        ]
      })
    ],
     actions: [
      {
        actionType: "submit",
        label: "Submit",
        validationDisable: true,
        buttonConfig: {
          buttonTheme: 'primary',
          buttonSize: 'sm',
          buttonType: 'submit',
          style: {"font-family": "roboto-regular"},
          classes: '!text-base !mt-0'
        }
      }
    ]
  }
)


export const CASHIER_CUSTOMER_CALCULATE_WALLET_FORM: FormConfig = new FormConfig(
  {
    controls: [
      new InputTextField({
        key: "bill_no",
        value: "",
        type: "text",
        label: "Bill Number",
        order:1,
        placeholder: "Enter bill number",
        validations: [
          new FormBaseControlValidator({
            validatorName: ValidatorsType.CONDITIONAL_REQUIRED,
            message: "Bill number is required when amount exceeds ₹50,000",
            validatorValue: true,
            conditions: {
              fieldName: "total_amount",
              value: 10000,
              operator: ConditionLogicType.GREATER_THAN
            }
          })
        ]
      }),
      new InputTextField({
        key: "total_amount",
        value: "",
        type: "number",
        label: "Bill Amount",
        order:2,
        prefix: "₹",
        showValidationIcon: true,
        placeholder: "Enter bill amount",
         validations: [
          new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
          new FormBaseControlValidator({validatorName: ValidatorsType.MIN,message: "Bill amount should be greater than 0", validatorValue: 1 }),
        ],
        sub_childs: [
          new ChildFormInterfaceModel({
            conditionValue: 10000,
            conditionLogic: ConditionLogicType.GREATER_THAN,
            items: [
              new InputTextField({
                key: "bill_attachment",
                type: "file",
                label: "Bill Image",
                order: 6,
                validations: [
                  new FormBaseControlValidator({validatorName: ValidatorsType.REQUIRED,message: "Required this field", validatorValue: true }),
                  new FormBaseControlValidator({validatorName: ValidatorsType.FILE_VALID_TYPE, message: "Invalid file type. Please upload an image.", validatorValue: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'] }),
                  new FormBaseControlValidator({validatorName: ValidatorsType.MAX_FILE_SIZE, message: "File size must be 1MB or less", validatorValue: 1 }),
                ]
              })
            ]
          }),
        ]
      })
    ],
     actions: [
      {
        actionType: "submit",
        label: "Submit",
        validationDisable: true,
        buttonConfig: {
          buttonTheme: 'primary',
          buttonSize: 'sm',
          buttonType: 'submit',
          style: {"font-family": "roboto-regular"},
          classes: '!text-base !mt-0'
        }
      }
    ]
  }
)
