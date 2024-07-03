export class TableModel {
  columns: TableColumn[] = [];
  data : any[] = [];
  createButtonLabel : string = '';
  mobileResponsiveCard : boolean = false;
  pagination ?: TablePagination;
}

interface TablePagination {
  pageNumber : number;
  totalPages : number;
  currentPage : number;
  pageSize : number;
}

interface TableColumn {
  order ?: number;
  columnKey : string;
  columnName : string;
  columnType : TableColumnType;
}

type TableColumnType = 'text' | 'image' | 'action' | 'html';
