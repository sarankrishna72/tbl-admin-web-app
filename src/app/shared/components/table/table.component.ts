import { DEFAULT_IMAGES } from './../../../core/constants/image';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TableColumn, TableModel } from '../../../core/model';
import * as _ from 'lodash';
import { ButtonComponent } from '../form/components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnChanges{
  @Input() tableConfigs!: TableModel;
  colsDef: TableColumn[] = [];
  tableRowData: any[] = [];
  staticImages:any =  DEFAULT_IMAGES;

  generateColumns(): void {
    this.colsDef = _.orderBy(this.tableConfigs!.columns, ['order'],['asc']);
    if (this.tableConfigs.showIndexColumn) {
      this.colsDef.unshift({
        columnKey: "index",
        columnType: "index",
        columnName: "No.",
        columnWidth: "100px"

      })
    }

    if (this.tableConfigs.actions?.length! > 0) {
      this.colsDef.push({
        columnKey: "action",
        columnType: "action",
        columnName: "Actions",
        columnWidth: "150px"
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
