export class TableModel {
  columns: TableColumn[] = [];
  data : any[] = [];
  createButtonLabel ?: string = '';
  mobileResponsiveCard ?: boolean = false;
  pagination: TablePagination | null;
  tableHeadColumnClass ?: string = '';
  tableBodyColumnClass ?: string = '';
  sortKey : string = '';
  sortDirection : boolean | 'asc' | 'desc' = 'asc';
  showIndexColumn ?: boolean = false;
  actions ?: TableActions[] = [];
  constructor(options: {
    columns: TableColumn[];
    data: any[];
    createButtonLabel ?: string;
    mobileResponsiveCard ?: boolean;
    tableHeadColumnClass ?: string;
    tableBodyColumnClass ?: string;
    pagination ?: TablePagination;
    sortKey : string;
    sortDirection :  boolean | 'asc' | 'desc';
    showIndexColumn ?: boolean;
    actions ?: TableActions[]
  }) {
    this.columns = options.columns || [];
    this.data = options.data || [];
    this.mobileResponsiveCard = options.mobileResponsiveCard || false;
    this.createButtonLabel = options.createButtonLabel || '' ;
    this.sortKey = options.sortKey || '' ;
    this.sortDirection = options.sortDirection || 'asc' ;
    this.tableHeadColumnClass = options.tableHeadColumnClass || '' ;
    this.tableBodyColumnClass = options.tableBodyColumnClass || '' ;
    this.pagination = options.pagination || null;
    this.showIndexColumn = options.showIndexColumn || false;
    this.actions = options.actions || [];
  }
}

export class TablePagination {
  totalCount : number;
  totalPages : number;
  currentPage : number;
  pageSize : number;
  constructor(
    options: {
      current_page: number,
      total_pages: number,
      per_page: number,
      total_count: number,
    }
  ) {
    this.currentPage = options.current_page || 1;
    this.totalPages = options.total_pages || 1;
    this.pageSize = options.per_page || 10;
    this.totalCount = options.total_count || 1;
  }
}

interface TableActions {
  actionName ?: string;
  actionId : string;
  label ?: string;
  actionType: TableActionType;
  icon ?: string;
  customIconPath ?: string;
  classes ?: string;
  isShow ?: Function
}

export class TableColumn {
  order ?: number | null = null;
  columnKey : string = '';
  columnName : string | null = null;
  columnType : TableColumnType;
  checkbox ?: boolean = false;
  columnWidth ?: string = '120px';
  sort ?: boolean = false;
  cellFormatFn ?: Function | undefined = undefined;
  constructor(options: {
    order ?: number;
    columnKey : string;
    columnName ?: string;
    columnType : TableColumnType;
    checkbox ?: boolean;
    columnWidth ?: string;
    sort ?: boolean;
    cellFormatFn ?: Function | undefined;
  }) {
    this.order = options.order || 0;
    this.columnKey = options.columnKey || '';
    this.checkbox = options.checkbox || false;
    this.columnName = options.columnName || '' ;
    this.columnType = options.columnType  ;
    this.columnWidth = options.columnWidth || '' ;
    this.sort = options.sort || false;
    this.cellFormatFn = options.cellFormatFn || undefined;
  }
}

type TableColumnType = 'text' | 'image' | 'action' | 'html' | 'index' | 'format';
type TableActionType = 'edit' | 'delete' | 'custom' | 'view';

export interface PaginationInterface {
  page: number, 
  per_page: number
}