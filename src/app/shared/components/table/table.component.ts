import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableColumn, TableModel } from '../../../core/model';
import * as _ from 'lodash';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnChanges{
  @Input() tableConfigs!: TableModel;
  colsDef: TableColumn[] = [];
  tableRowData: any[] = [];


  generateColumns(): void {
    this.colsDef = _.orderBy(this.tableConfigs!.columns, ['order'],['asc']);
    if (this.tableConfigs.showIndexColumn) {
      this.colsDef.unshift({
        columnKey: "index",
        columnType: "text",
        columnName: "No.",
      })
    }

    if (this.tableConfigs.actions?.length! > 0) {
      this.colsDef.push({
        columnKey: "action",
        columnType: "action",
        columnName: "Action",
      })
    }
  }


  sortData(sortKey: string, sortDirection: boolean | "asc" | "desc" ): void {
    this.tableRowData = _.orderBy(this.tableConfigs!.data, [sortKey],[sortDirection]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableConfigs'] && changes['tableConfigs'].currentValue) {
      this.generateColumns();
      this.sortData( this.tableConfigs.sortKey, this.tableConfigs.sortDirection);
    }
  }

}
