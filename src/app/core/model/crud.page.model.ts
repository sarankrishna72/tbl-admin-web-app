import { Observable } from "rxjs";
import { FormConfig } from "./form.model";
import { TableModel } from "./table.model";
import { ButtonTheme } from "../constants/types";

export class CrudPageModel {
  tableConfigs: TableModel;
  pageActions?: CrudPageActions[] = [];
  title : string = '';
  list_api ?: any | null;
  create_api ?: any | null;
  update_api ?: any  | null;
  formConfigs ?: FormConfig | null;
  api_params ?: Object = {};

  constructor(options: {
    tableConfigs: TableModel;
    pageActions?: CrudPageActions[] ;
    title : string;
    list_api ?: any;
    create_api ?: any;
    update_api ?: any;
    formConfigs ?: FormConfig;
    api_params ?: Object;
  }) {
    this.tableConfigs = options.tableConfigs;
    this.pageActions = options.pageActions || [];
    this.title = options.title || '';
    this.list_api = options.list_api || null;
    this.create_api = options.create_api || null;
    this.update_api = options.update_api || null;
    this.formConfigs = options.formConfigs || null;
    this.api_params = options.api_params || {};
  }
}

interface CrudPageActions {
  action_name: CrudePageActionName;
  icon ?: string;
  label ?: string;
  button_theme : ButtonTheme;
  action_id : string;
  classes ?: string;
}

type CrudePageActionName = 'create' | 'delete_all' | 'custom';
