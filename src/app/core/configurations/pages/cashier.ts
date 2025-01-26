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
        actionId: 'edit',
        actionType: 'edit',
        icon: 'edit',
        label: "Edit Cashier",
        classes: 'hover:!text-primary-500'
      }, {
        actionId: 'delete',
        actionType: 'delete',
        icon: 'delete',
        label: "Delete Cashier",
        classes: 'hover:!text-error-500'
      }
    ]
  }
);


const CashierPageData: CrudPageModel = new CrudPageModel(
  {
    id: 'cashiers',
    apiParams: "cashier",
    title: 'Cashier Accounts',
    tableConfigs: tableConfig,
    formConfigs: CASHIER_FORM_DATA,
    actionsLabel: [
      {label: "Create New Cashier", buttonLabel: "Create", type: "create"},
      {label: "Edit Cashier", buttonLabel: "Update", type: "edit"}
    ],
    listApi: {url: API_URI.cashiersURI, method: "get"},
    createApi: {url: API_URI.cashiersURI, method: "post"},
    updateApi: {url: API_URI.cashiersIdURI, method: "put"},
    deleteApi: {url: API_URI.cashiersIdURI, method: "delete"},
    formDisplayKeys: [
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
        actionName: 'create',
        icon: "add",
        label: "Create New Cashier",
        buttonTheme: "primary-outlined",
        actionId : "create",
      },

    ]
  }
)

export { CashierPageData };
