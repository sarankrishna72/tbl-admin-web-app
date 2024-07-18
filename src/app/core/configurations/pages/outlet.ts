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
    columnName: "Address",
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
    createButtonLabel: 'Create New Outlet',
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


const OutletPageData: CrudPageModel = new CrudPageModel(
  {
    api_params: "restaurant",
    title: 'Manage Outlets',
    tableConfigs: tableConfig,
    formConfigs: OUTLET_FORM_DATA,
    actionsLabel: [
      {label: "Create New Outlet", buttonLabel: "Create", type: "create"},
      {label: "Edit Outlet", buttonLabel: "Update", type: "edit"}
    ],
    list_api: {url: API_URI.restaurantsURI, method: "get"},
    create_api: {url: API_URI.restaurantsURI, method: "post"},
    update_api: {url: API_URI.restaurantsEditURI, method: "put"},
    form_display_keys: [{mappingKey: 'id', key: 'id'},{mappingKey: 'city_id', key: 'city.id'},{mappingKey: 'address', key: 'address'}, {mappingKey: 'restaurant_name', key: 'restaurant_name'}, {mappingKey: 'photos', key: 'photos'}],
    pageActions: [
      {
        action_name: 'create',
        icon: "add",
        label: "Create New Outlet",
        button_theme: "primary-outlined",
        action_id : "create",
      },

    ]
  }
)

export { OutletPageData };
