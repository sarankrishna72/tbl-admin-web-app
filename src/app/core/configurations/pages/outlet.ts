import { API_URI } from "../../constants/api_uri";
import { CrudPageModel, TableColumn, TableModel } from "../../model";
import { OUTLET_FORM_DATA } from "../forms";


const tableColumns: TableColumn[] = [
  new TableColumn({
    columnKey: "restaurant_name",
    columnName: "Outlet Name",
    columnType: "text",
    order: 1,
    columnWidth: "150px",
  }),
  new TableColumn({
    columnKey: "feature_photo",
    columnName: "Outlet Image",
    columnType: "image",
    order: 2,
    columnWidth: "150px",
  }),
  new TableColumn({
    columnKey: "city.name",
    columnName: "City",
    columnType: "text",
    order: 3,
    columnWidth: "150px",
  }),
  new TableColumn({
    columnKey: "address",
    columnName: "Area",
    columnType: "text",
    order: 5,
    columnWidth: "150px",
  })
]


const tableConfig: TableModel = new TableModel(
  {
    columns: tableColumns,
    data: [
    ],
    createButtonLabel: 'Create New Outlet',
    mobileResponsiveCard: true,
    showIndexColumn: true,
    sortKey: 'id',
    sortDirection: 'asc',
    actions: [
      {
        actionId: 'edit',
        actionType: 'edit',
        icon: 'edit',
        label: "Edit Outlet",
        classes: 'hover:!text-primary-500'
      }, {
        actionId: 'delete',
        actionType: 'delete',
        label: "Delete Outlet",
        icon: 'delete',
        classes: 'hover:!text-error-500'
      }
    ]
  }
);


const OutletPageData: CrudPageModel = new CrudPageModel(
  {
    id: 'outlets',
    apiParams: "restaurant",
    title: 'Manage Outlets',
    tableConfigs: tableConfig,
    formConfigs: OUTLET_FORM_DATA,
    actionsLabel: [
      {label: "Create New Outlet", buttonLabel: "Create", type: "create"},
      {label: "Edit Outlet", buttonLabel: "Update", type: "edit"}
    ],
    listApi: {url: API_URI.restaurantsURI, method: "get"},
    createApi: {url: API_URI.restaurantsURI, method: "post"},
    updateApi: {url: API_URI.restaurantsIdURI, method: "put"},
    deleteApi: {url: API_URI.restaurantsIdURI, method: "delete"},
    formDisplayKeys: [
      {mappingKey: 'id', key: 'id'},
      {mappingKey: 'city_id', key: 'city.id'},
      {mappingKey: 'address', key: 'address'},
      {mappingKey: 'restaurant_name', key: 'restaurant_name'},
      {mappingKey: 'photos', key: 'photos'},
      {mappingKey: 'front_desk_person_number', key: 'front_desk_person_number'},
      {mappingKey: 'is_new_restaurant', key: 'is_new_restaurant'}
    ],
    pageActions: [
      {
        actionName: 'create',
        icon: "add",
        label: "Create New Outlet",
        buttonTheme: "primary-outlined",
        actionId : "create",
      },

    ]
  }
)

export { OutletPageData };
