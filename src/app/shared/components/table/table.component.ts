import { DEFAULT_IMAGES } from './../../../core/constants/image';
import { Component, Input, OnChanges, Output, SimpleChanges,EventEmitter } from '@angular/core';
import { TableColumn, TableModel } from '../../../core/model';
import * as _ from 'lodash';
import { ButtonComponent } from '..';
import { CommonModule } from '@angular/common';
import { getObjValueFromPath } from '../../../core/lib/lib';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    ButtonComponent,
    CommonModule,
    PaginationComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnChanges{
  @Input() tableConfigs!: TableModel;
  @Output() tableActionCTA: EventEmitter<any> = new EventEmitter();
  @Output() onPaginationChange:  EventEmitter<any> = new EventEmitter();
  colsDef: TableColumn[] = [];
  @Input() tableRowData: any[] = [];
  staticImages:any =  DEFAULT_IMAGES;

  generateColumns(): void {
    this.colsDef = _.orderBy(this.tableConfigs!.columns, ['order'],['asc']);
    if (this.tableConfigs.showIndexColumn) {
      this.colsDef.unshift({
        columnKey: "index",
        columnType: "index",
        columnName: "No.",
        columnWidth: "50px"
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

  paginationChange(event: any) {
    this.onPaginationChange.emit(event)
  }

  checkActionShow(action: any, data: any) {
    return (typeof action.is_show == 'function' && action.is_show!(data) )|| !action.is_show
  }

  tableAction(data: any): void {
    if (data.action == 'create') {
      data.action = {
        action_name: 'create',
        icon: "add",
        label: this.tableConfigs.createButtonLabel,
        button_theme: "primary-outlined",
        action_id : "create",
      }
    }
    this.tableActionCTA.emit( {...data.action, data: data.data} );
  }

  getColumnData(columnKey: string, rowData: any) {
    return getObjValueFromPath(rowData, columnKey) != '' ? getObjValueFromPath(rowData, columnKey) : null
  }


  sortData(sortKey: string, sortDirection: boolean | "asc" | "desc" ): void {
  
    this.tableRowData = _.orderBy(this.tableRowData, [(obj: any) => {
      if (!isNaN(Date.parse(obj[sortKey]))) {
        return new Date(obj[sortKey]).getTime();
      } else {
        return obj[sortKey];
      }
    }],[sortDirection]);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableRowData']) {
      if (this.tableRowData.length != 0) {
        this.generateColumns();
        this.sortData( this.tableConfigs.sortKey, this.tableConfigs.sortDirection);
      }
    }
  }

}
