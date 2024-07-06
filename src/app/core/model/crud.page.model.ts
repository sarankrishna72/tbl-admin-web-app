import { Observable } from "rxjs";
import { FormConfig } from "./form.model";
import { TableModel } from "./table.model";
import { ButtonTheme } from "../constants/types";

export class CrudPageModel {
  tableConfigs?: TableModel | null;
  pageActions?: CrudPageActions[] = [];
  title : string = '';
  list_api ?: Observable<any> | null;
  create_api ?: Observable<any>  | null;
  update_api ?: Observable<any>  | null;
  formConfigs ?: FormConfig | null;
  api_params ?: Object = {};

  constructor(options: {
    tableConfigs?: TableModel;
    pageActions?: CrudPageActions[] ;
    title : string;
    list_api ?: Observable<any>;
    create_api ?: Observable<any>;
    update_api ?: Observable<any>;
    formConfigs ?: FormConfig;
    api_params ?: Object;
  }) {
    this.tableConfigs = options.tableConfigs || null;
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
}

type CrudePageActionName = 'create' | 'delete_all' | 'custom';
