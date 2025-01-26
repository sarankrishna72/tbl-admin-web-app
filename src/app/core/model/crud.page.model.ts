import { Observable } from "rxjs";
import { FormConfig } from "./form.model";
import { TableModel } from "./table.model";
import { ButtonTheme } from "../constants/types";

export class CrudPageModel {
  id: string; 
  tableConfigs: TableModel;
  pageActions?: CrudPageActions[] = [];
  viewPageActions?: CrudPageActions[] = [];
  title : string = '';
  listApi ?: ApiInterface | null;
  createApi ?: ApiInterface | null;
  updateApi ?: ApiInterface  | null;
  deleteApi ?: ApiInterface  | null;
  viewApi ?: ApiInterface  | null;
  formConfigs ?: FormConfig | null;
  apiParams ?: Object = {};
  formDisplayKeys ?: FormDisplayKeys[] | null = [];
  actionsLabel ?: ActionsLabel[] = [];
  viewDisplayData ?: ViewDisplayData[] = [] 
  constructor(options: {
    id: string;
    tableConfigs: TableModel;
    pageActions?: CrudPageActions[] ;
    viewPageActions?: CrudPageActions[] ;
    title : string;
    listApi ?: ApiInterface;
    createApi ?: ApiInterface;
    updateApi ?: ApiInterface;
    deleteApi ?: ApiInterface;
    viewApi ?: ApiInterface;
    formConfigs ?: FormConfig;
    apiParams ?: Object;
    formDisplayKeys ?: FormDisplayKeys[];
    actionsLabel ?: ActionsLabel[];
    viewDisplayData ?: ViewDisplayData[]
  }) {
    this.id = options.id;
    this.tableConfigs = options.tableConfigs;
    this.pageActions = options.pageActions || [];
    this.viewPageActions = options.viewPageActions || [];
    this.title = options.title || '';
    this.listApi = options.listApi || null;
    this.createApi = options.createApi || null;
    this.updateApi = options.updateApi || null;
    this.deleteApi = options.deleteApi || null;
    this.formConfigs = options.formConfigs || null;
    this.apiParams = options.apiParams || {};
    this.formDisplayKeys = options.formDisplayKeys || null;
    this.actionsLabel = options.actionsLabel || [];
    this.viewApi = options.viewApi || null;
    this.viewDisplayData = options.viewDisplayData;
  }
}

interface ActionsLabel {
  type: 'edit' | 'delete' | 'create';
  label: string;
  buttonLabel: string;
}

interface ViewDisplayData {
  key : string;
  label : string;
  formatFunc ?: Function;
  classes ?: string;
}

interface CrudPageActions {
  actionName: CrudePageActionName;
  icon ?: string;
  label ?: string;
  buttonTheme : ButtonTheme;
  actionId : string;
  classes ?: string;
  customIconPath ?: string;
  isShow ?: Function;

}

interface ApiInterface {
  method: 'get' | 'put' | 'delete' | 'post';
  url: string;
}


interface FormDisplayKeys {
  mappingKey : string;
  key : string;
}

type CrudePageActionName = 'create' | 'delete_all' | 'custom' | 'delete' | 'edit';
