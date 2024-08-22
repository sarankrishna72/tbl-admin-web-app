import { API_URI } from "../../constants/api_uri";
import { CrudPageModel, TableColumn, TableModel } from "../../model";
import { CASHIER_FORM_DATA } from "../forms";


const tableColumns: TableColumn[] = [
  new TableColumn({
    columnKey: "name",
    columnName: "Cashier Name",
    columnType: "text",
    order: 1,
    columnWidth: "150px",
  }),
  new TableColumn({
    columnKey: "email",
    columnName: "Email",
    columnType: "text",
    order: 2,
    columnWidth: "150px",
  }),
  new TableColumn({
    columnKey: "restaurant.name",
    columnName: "Restaurant Name",
    columnType: "text",
    order: 3,
    columnWidth: "150px",
  }),
 new TableColumn({
    columnKey: "phone_number",
    columnName: "Phone Number",
    columnType: "text",
    order: 4,
    columnWidth: "150px",
  })
]


const tableConfig: TableModel = new TableModel(
  {
    columns: tableColumns,
    data: [
    ],
    createButtonLabel: 'Create New Cashier',
    mobileResponsiveCard: true,
    showIndexColumn: true,
    sortKey: 'id',
    sortDirection: 'asc',
    actions: [
      {
        action_id: 'edit',
        action_type: 'edit',
        icon: 'edit',
        classes: 'hover:!text-primary-500'
      }, {
        action_id: 'delete',
        action_type: 'delete',
        icon: 'delete',
        classes: 'hover:!text-error-500'
      }
    ]
  }
);


const CashierPageData: CrudPageModel = new CrudPageModel(
  {
    api_params: "cashier",
    title: 'Cashier Accounts',
    tableConfigs: tableConfig,
    formConfigs: CASHIER_FORM_DATA,
    actionsLabel: [
      {label: "Create New Cashier", buttonLabel: "Create", type: "create"},
      {label: "Edit Cashier", buttonLabel: "Update", type: "edit"}
    ],
    list_api: {url: API_URI.cashiersURI, method: "get"},
    create_api: {url: API_URI.cashiersURI, method: "post"},
    update_api: {url: API_URI.cashiersIdURI, method: "put"},
    delete_api: {url: API_URI.cashiersIdURI, method: "delete"},
    form_display_keys: [
      {mappingKey: 'id', key: 'id'},
      {mappingKey: 'restaurant_id', key: 'restaurant.id'},
      {mappingKey: 'name', key: 'name'},
      {mappingKey: 'email', key: 'email'},
      {mappingKey: 'photos', key: 'photos'},
      {mappingKey: 'phone_number', key: 'phone_number'},
      {mappingKey: 'is_new_restaurant', key: 'is_new_restaurant'}
    ],
    pageActions: [
      {
        action_name: 'create',
        icon: "add",
        label: "Create New Cashier",
        button_theme: "primary-outlined",
        action_id : "create",
      },

    ]
  }
)

export { CashierPageData };
