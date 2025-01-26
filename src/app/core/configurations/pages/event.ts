import moment from "moment";
import { API_URI } from "../../constants/api_uri";
import { CrudPageModel, TableColumn, TableModel } from "../../model";
import { EVENT_FORM_DATA } from "../forms";
import { checkIsUrl, returnStatusClass } from "../../lib/lib";
import { DEFAULT_IMAGES } from "../../constants";

const tableColumns: TableColumn[] = [
  new TableColumn({
    columnKey: "restaurant.address",
    columnName: "Outlet Name",
    columnType: "text",
    order: 1,
    // columnWidth: "150px",
  }),
  new TableColumn({
    columnKey: "title",
    columnName: "Title",
    columnType: "text",
    order: 2,
    // columnWidth: "150px",
  }),
  // new TableColumn({
  //   columnKey: "description",
  //   columnName: "Description",
  //   columnType: "text",
  //   order: 3,
  //   // columnWidth: "150px",
  // }),
  new TableColumn({
    columnKey: "feature_photo",
    columnName: "Image",
    columnType: "image",
    order: 4,
    // columnWidth: "150px",
  }),
  new TableColumn({
    columnKey: "event_date",
    columnName: "Event Date",
    columnType: "format",
    order: 5,
    // columnWidth: "150px",
    cellFormatFn: (data: any) => {
      return moment(new Date(data.event_date)).format("DD/MM/YYYY hh:mm A");
    }
  }),
  // new TableColumn({
  //   columnKey: "redirection_type",
  //   columnName: "Redirection",
  //   columnType: "text",
  //   order: 6,
  //   columnWidth: "150px",
  // }),
  // new TableColumn({
  //   columnKey: "redirection_link",
  //   columnName: "Link",
  //   columnType: "format",
  //   order: 7,
  //   cellFormatFn: (data: any) => {
  //     if (checkIsUrl(data.redirection_link)) {
  //       return `<a class="w-[150px] text-primary-600 font-semibold overflow-hidden truncate block" href="${data.redirection_link}" target="_blank" title="${data.redirection_link}">${data.redirection_link == 'null' || !data.redirection_link ? '-' : data.redirection_link }</a>`
  //     }
  //     return `<div class="w-[150px] overflow-hidden truncate block">${data.redirection_link == 'null' || !data.redirection_link ? '-' : data.redirection_link }</div>`
  //   }

  //   // columnWidth: "150px",
  // }),
  new TableColumn({
    columnKey: "status",
    columnName: "Status",
    columnType: "format",
    order: 8,
    cellFormatFn: (data: any) => {
      return `<span class="capitalize ${returnStatusClass(data.status)} font-semibold">${data.status}</span>`
    }
    // columnWidth: "150px",
  }),
]


const tableConfig: TableModel = new TableModel(
  {
    columns: tableColumns,
    data: [
    ],
    createButtonLabel: 'Create New Event',
    mobileResponsiveCard: true,
    showIndexColumn: true,
    sortKey: 'notification_push_date',
    sortDirection: 'desc',
    actions: [
      {
        actionId: 'edit',
        actionType: 'edit',
        customIconPath: DEFAULT_IMAGES.edit,
        label: "Edit Event",
        isShow: (data: any) => { return data?.status?.toLowerCase() == "pending" },
        classes: 'hover:!text-primary-500'
      }, {
        actionId: 'delete',
        actionType: 'delete',
        customIconPath: DEFAULT_IMAGES.delete,
        label: "Delete Event",
        classes: 'hover:!text-error-500'
      },
      {
        actionId: 'view',
        actionType: 'custom',
        label: "View Outlet",
        icon: 'visibility',
        classes: 'hover:!text-primary-500'
      }
    ]
  }
);


const EventPageData: CrudPageModel = new CrudPageModel(
  {
    id: "events",
    apiParams: "event",
    title: 'Manage Events',
    tableConfigs: tableConfig,
    formConfigs: EVENT_FORM_DATA,
    actionsLabel: [
      {label: "Create New Event", buttonLabel: "Create", type: "create"},
      {label: "Edit Event", buttonLabel: "Update", type: "edit"}
    ],
    listApi: {url: API_URI.eventsURI, method: "get"},
    createApi: {url: API_URI.eventsURI, method: "post"},
    updateApi: {url: API_URI.eventsIdURI, method: "put"},
    deleteApi: {url: API_URI.eventsIdURI, method: "delete"},
    viewApi: {url: API_URI.eventsIdURI, method: "get"},
    formDisplayKeys: [
      {mappingKey: 'id', key: 'id'},
      {mappingKey: 'restaurant_id', key: 'restaurant.id'},
      {mappingKey: 'title', key: 'title'},
      {mappingKey: 'description', key: 'description'},
      {mappingKey: 'photos', key: 'photos'},
      {mappingKey: 'notification_push_date', key: 'notification_push_date'},
      {mappingKey: 'event_date', key: 'event_date'},
      {mappingKey: 'redirection_link', key: 'redirection_link'},
      {mappingKey: 'redirection_type', key: 'redirection_type'},
      {mappingKey: 'send_immediate_notification', key: 'send_notification_now'},
    ],
    viewDisplayData: [
      {
        key: 'id',
        label: "No."
      },
      {
        key: 'restaurant.address',
        label: "Outlet Name"
      },
      {
        key: 'title',
        label: "Title"
      },
      {
        key: 'description',
        label: "Description"
      },
      {
        key: 'feature_photo',
        label: "Image",
        formatFunc: (data: any) => {
          if (data.feature_photo) {
            return  `<img
              class="h-[50px] w-[90px] rounded-md"
              src="${data.feature_photo}"
            />`
          }
          return '-';
        }
      },
      {
        key: 'redirection_type',
        label: "Redirection"
      },
      {
        key: 'redirection_link',
        label: "Redirection Link/Screen"
      },
      {
        key: 'event_date',
        label: 'Event Date & Time',
        formatFunc: (data: any) => {
          if (data.event_date) {
            return moment(new Date(data.event_date)).format("DD/MM/YYYY hh:mm A");
          } else {
            return '-'
          }
        } 
      },
      {
        key: 'notification_push_date',
        label: 'Schedule Date & Time',
        formatFunc: (data: any) => {
          if (data.notification_push_date) {
            return moment(new Date(data.notification_push_date)).format("DD/MM/YYYY hh:mm A");
          } else {
            return '-'
          }
          
        } 
      },
      {
        key: 'status',
        label: 'Status',
        formatFunc: (data: any) => {
          return `<span class="capitalize ${returnStatusClass(data.status)} font-semibold">${data.status}</span>`
        } 
      }
    ],
    pageActions: [
      {
        actionName: 'create',
        icon: "add",
        label: "Create New Event",
        buttonTheme: "primary-outlined",
        actionId : "create",
      },
    ],
    viewPageActions: [
      {
        actionName: '',
        customIconPath: DEFAULT_IMAGES.edit,
        buttonTheme: "",
        label: "Edit Event",
        actionId : "edit",
        isShow: (data: any) => { return data?.status?.toLowerCase() == "pending" },
      },
      {
        actionName: '',
        customIconPath: DEFAULT_IMAGES.delete,
        label: "",
        buttonTheme: "",
        actionId : "delete",
      }
    ]
  }
)

export { EventPageData };
