import { CrudPageModel, TableColumn, TableModel } from "../../model";
import { OUTLET_FORM_DATA } from "../forms";


const tableColumns: TableColumn[] = [
  new TableColumn({
    columnKey: "name",
    columnName: "Outlet Name",
    columnType: "text",
    order: 1,
    columnWidth: "100px",
  }),
  new TableColumn({
    columnKey: "image",
    columnName: "Outlet Image",
    columnType: "image",
    order: 2,
    columnWidth: "100px",
  }),
  new TableColumn({
    columnKey: "city",
    columnName: "City",
    columnType: "text",
    order: 3,
    columnWidth: "100px",
  }),
  new TableColumn({
    columnKey: "area",
    columnName: "Area",
    columnType: "text",
    order: 4,
    columnWidth: "100px",
  })
]


const tableConfig: TableModel = new TableModel(
  {
    columns: tableColumns,
    data: [],
    createButtonLabel: 'Create New Outlet',
    mobileResponsiveCard: true,
    showIndexColumn: true,
    sortKey: 'id',
    sortDirection: 'asc',
    actions: [
      {
        action_id: 'edit',
        action_type: 'edit',
        icon: ''
      }, {
        action_id: 'delete',
        action_type: 'delete',
        icon: ''
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
        action_id : "create"
      },

    ]
  }
)

export { OutletPageData };
