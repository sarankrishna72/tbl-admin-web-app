import { Observable } from "rxjs";
import { FormConfig } from "./form.model";
import { TableModel } from "./table.model";
import { ButtonTheme } from "../constants/types";

export class CrudPageModel {
  tableConfigs: TableModel;
  pageActions?: CrudPageActions[] = [];
  title : string = '';
  list_api ?: ApiInterface | null;
  create_api ?: ApiInterface | null;
  update_api ?: ApiInterface  | null;
  formConfigs ?: FormConfig | null;
  api_params ?: Object = {};
  form_display_keys ?: FormDisplayKeys[] | null = [];
  actionsLabel ?: ActionsLabel[] = [];
  constructor(options: {
    tableConfigs: TableModel;
    pageActions?: CrudPageActions[] ;
    title : string;
    list_api ?: ApiInterface;
    create_api ?: ApiInterface;
    update_api ?: ApiInterface;
    formConfigs ?: FormConfig;
    api_params ?: Object;
    form_display_keys ?: FormDisplayKeys[];
    actionsLabel ?: ActionsLabel[];
  }) {
    this.tableConfigs = options.tableConfigs;
    this.pageActions = options.pageActions || [];
    this.title = options.title || '';
    this.list_api = options.list_api || null;
    this.create_api = options.create_api || null;
    this.update_api = options.update_api || null;
    this.formConfigs = options.formConfigs || null;
    this.api_params = options.api_params || {};
    this.form_display_keys = options.form_display_keys || null;
    this.actionsLabel = options.actionsLabel || [];
  }
}

interface ActionsLabel {
  type: 'edit' | 'delete' | 'create';
  label: string;
  buttonLabel: string;
}

interface CrudPageActions {
  action_name: CrudePageActionName;
  icon ?: string;
  label ?: string;
  button_theme : ButtonTheme;
  action_id : string;
  classes ?: string;
}

interface ApiInterface {
  method: 'get' | 'put' | 'delete' | 'post';
  url: string;
}


interface FormDisplayKeys {
  mappingKey : string;
  key : string;
}

type CrudePageActionName = 'create' | 'delete_all' | 'custom';
