import { CrudPageModel, TableColumn, TableModel } from "../../model";
import { OUTLET_FORM_DATA } from "../forms";


const tableColumns: TableColumn[] = [
  new TableColumn({
    columnKey: "name",
    columnName: "Outlet Name",
    columnType: "text",
    order: 1,
    columnWidth: "150px",
  }),
  new TableColumn({
    columnKey: "image",
    columnName: "Outlet Image",
    columnType: "image",
    order: 2,
    columnWidth: "150px",
  }),
  new TableColumn({
    columnKey: "city",
    columnName: "City",
    columnType: "text",
    order: 3,
    columnWidth: "150px",
  }),
  new TableColumn({
    columnKey: "area",
    columnName: "Area",
    columnType: "text",
    order: 4,
    columnWidth: "150px",
  })
]


const tableConfig: TableModel = new TableModel(
  {
    columns: tableColumns,
    data: [
      {
        name: "TBL Restaurant 1",
        image: "https://s3-alpha-sig.figma.com/img/b21b/d94a/b37db16407e54e952d299f02ba7e971e?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ShZXMUJ3MadkGiE8kufBmeuPF4p0jJgxD94Gw4jo4MFqMNvaSDI5dJI6UhKQcCNsqQNscLHWkvXAhlhknq8u8qNJ2sJtBGOZZv-6d-~xaiRSRxV892Aydw7SeNUmRt0dfJpr-LXYcbhDxDM41Kzn7NUQpDdV8ZCyt-mk3ALVIH7TtsiQWSqt0Owrp7v48Gb~A~IUHG~1CjCylG9rWlGd6vWHUwzfvuGvk99Ta3E9ygvA-DIEdAJ373mM9haWAt04YawVzHVg9W88WW4C4WjLholXSWkz6x4MLOvp~dLaWeFBUFr3uStOP2bTc-9gYEzkzNJsJdonixLFTPVJLpi4Jg__",
        city: "Bangalore",
        area: "Koramangala"
      },{
        name: "TBL Restaurant 2",
        image: "https://s3-alpha-sig.figma.com/img/b21b/d94a/b37db16407e54e952d299f02ba7e971e?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ShZXMUJ3MadkGiE8kufBmeuPF4p0jJgxD94Gw4jo4MFqMNvaSDI5dJI6UhKQcCNsqQNscLHWkvXAhlhknq8u8qNJ2sJtBGOZZv-6d-~xaiRSRxV892Aydw7SeNUmRt0dfJpr-LXYcbhDxDM41Kzn7NUQpDdV8ZCyt-mk3ALVIH7TtsiQWSqt0Owrp7v48Gb~A~IUHG~1CjCylG9rWlGd6vWHUwzfvuGvk99Ta3E9ygvA-DIEdAJ373mM9haWAt04YawVzHVg9W88WW4C4WjLholXSWkz6x4MLOvp~dLaWeFBUFr3uStOP2bTc-9gYEzkzNJsJdonixLFTPVJLpi4Jg__",
        city: "Bangalore",
        area: "Koramangala 5th Block"
      },{
        name: "TBL Restaurant 3",
        image: "https://s3-alpha-sig.figma.com/img/b21b/d94a/b37db16407e54e952d299f02ba7e971e?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ShZXMUJ3MadkGiE8kufBmeuPF4p0jJgxD94Gw4jo4MFqMNvaSDI5dJI6UhKQcCNsqQNscLHWkvXAhlhknq8u8qNJ2sJtBGOZZv-6d-~xaiRSRxV892Aydw7SeNUmRt0dfJpr-LXYcbhDxDM41Kzn7NUQpDdV8ZCyt-mk3ALVIH7TtsiQWSqt0Owrp7v48Gb~A~IUHG~1CjCylG9rWlGd6vWHUwzfvuGvk99Ta3E9ygvA-DIEdAJ373mM9haWAt04YawVzHVg9W88WW4C4WjLholXSWkz6x4MLOvp~dLaWeFBUFr3uStOP2bTc-9gYEzkzNJsJdonixLFTPVJLpi4Jg__",
        city: "Bangalore",
        area: "Electronic City"
      }
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
    api_params: {},
    title: 'Manage Outlets',
    tableConfigs: tableConfig,
    formConfigs: OUTLET_FORM_DATA,
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
