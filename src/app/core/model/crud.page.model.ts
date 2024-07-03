import { FormBase } from "./form.model";
import { TableModel } from "./table.model";

export class CrudPageModel {
  tableConfig: TableModel = new TableModel();
  pageActions ?: CrudPageActions[] = [];
  title : string = '';
  list_api_uri: string = '';
  create_api_uri: string = '';
  update_api_uri: string = '';
  formConfigs: FormBase[] = [];
  api_params ?: Object = {}
}

interface CrudPageActions {
  action_name: CrudePageActionName;
  icon ?: string;
  label ?: string;
  button_theme : string;
}

type CrudePageActionName = 'create' | 'delete_all' | 'select_all';
