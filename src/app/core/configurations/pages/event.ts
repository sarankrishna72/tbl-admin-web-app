import { API_URI } from "../../constants/api_uri";
import { CrudPageModel, TableColumn, TableModel } from "../../model";
import { EVENT_FORM_DATA } from "../forms";

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
    createButtonLabel: 'Create New Event',
    mobileResponsiveCard: true,
    showIndexColumn: true,
    sortKey: 'id',
    sortDirection: 'asc',
    actions: [
      {
        action_id: 'edit',
        action_type: 'edit',
        icon: 'edit',
        label: "Edit Event",
        classes: 'hover:!text-primary-500'
      }, {
        action_id: 'delete',
        action_type: 'delete',
        icon: 'delete',
        label: "Delete Event",
        classes: 'hover:!text-error-500'
      }
    ]
  }
);


const EventPageData: CrudPageModel = new CrudPageModel(
  {
    api_params: "restaurant",
    title: 'Manage Events',
    tableConfigs: tableConfig,
    formConfigs: EVENT_FORM_DATA,
    actionsLabel: [
      {label: "Create New Event", buttonLabel: "Create", type: "create"},
      {label: "Edit Event", buttonLabel: "Update", type: "edit"}
    ],
    list_api: {url: API_URI.restaurantsURI, method: "get"},
    create_api: {url: API_URI.restaurantsURI, method: "post"},
    update_api: {url: API_URI.restaurantsIdURI, method: "put"},
    delete_api: {url: API_URI.restaurantsIdURI, method: "delete"},
    form_display_keys: [
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
        action_name: 'create',
        icon: "add",
        label: "Create New Event",
        button_theme: "primary-outlined",
        action_id : "create",
      },

    ]
  }
)

export { EventPageData };
