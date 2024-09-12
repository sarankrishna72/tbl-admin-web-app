import { API_URI } from "../../constants/api_uri";
import { CrudPageModel, TableColumn, TableModel } from "../../model";
import { EVENT_FORM_DATA } from "../forms";

const tableColumns: TableColumn[] = [
  new TableColumn({
    columnKey: "restaurant.name",
    columnName: "Outlet Name",
    columnType: "text",
    order: 1,
    columnWidth: "150px",
  }),
  new TableColumn({
    columnKey: "title",
    columnName: "Title",
    columnType: "text",
    order: 2,
    columnWidth: "150px",
  }),
  new TableColumn({
    columnKey: "description",
    columnName: "Description",
    columnType: "text",
    order: 3,
    columnWidth: "150px",
  }),
  new TableColumn({
    columnKey: "feature_photo",
    columnName: "Image",
    columnType: "image",
    order: 4,
    columnWidth: "150px",
  }),
  new TableColumn({
    columnKey: "event_date",
    columnName: "Event Date",
    columnType: "text",
    order: 5,
    columnWidth: "150px",
  }),

  new TableColumn({
    columnKey: "redirection_link",
    columnName: "Redirection Link",
    columnType: "text",
    order: 7,
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
    api_params: "event",
    title: 'Manage Events',
    tableConfigs: tableConfig,
    formConfigs: EVENT_FORM_DATA,
    actionsLabel: [
      {label: "Create New Event", buttonLabel: "Create", type: "create"},
      {label: "Edit Event", buttonLabel: "Update", type: "edit"}
    ],
    list_api: {url: API_URI.eventsURI, method: "get"},
    create_api: {url: API_URI.eventsURI, method: "post"},
    update_api: {url: API_URI.eventsIdURI, method: "put"},
    delete_api: {url: API_URI.eventsIdURI, method: "delete"},
    form_display_keys: [
      {mappingKey: 'id', key: 'id'},
      {mappingKey: 'restaurant_id', key: 'restaurant.id'},
      {mappingKey: 'title', key: 'title'},
      {mappingKey: 'description', key: 'description'},
      {mappingKey: 'photos', key: 'photos'},
      {mappingKey: 'notification_push_date', key: 'notification_push_date'},
      {mappingKey: 'event_date', key: 'event_date'},
      {mappingKey: 'redirection_link', key: 'redirection_link'}

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
