import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { TablePagination } from '../../../core/model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() pagination: TablePagination = new TablePagination({current_page: 1, per_page: 10, total_count: 0, total_pages: 0});
  @Input() currentPageCount: number = 0;
  @Output() onPaginationChange: EventEmitter<any> = new EventEmitter();


  paginationUpdateCallback(event: paginationEmit) {
    this.onPaginationChange.emit(event)
  }
}

interface paginationEmit {
  page: number,
  per_page: number
}
