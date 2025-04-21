import moment from "moment";
import { TableColumn, TableModel } from "../../model";
import { returnWalletHistoryStatusClass } from "../../lib/lib";

const tableColumns: TableColumn[] = [
  new TableColumn({
    columnKey: "bill_no",
    columnName: "Bill No",
    columnType: "format",
    columnWidth: "175px",
    order: 1,
    cellFormatFn: (data: any) => {
      return `<span class="capitalize">${data.bill_no || '-'} </span>`;
    }
  }),
  new TableColumn({
    columnKey: "bill_amount",
    columnName: "Bill Amount",
    columnType: "format",
    columnWidth: "150px",
    order: 2,
    cellFormatFn: (data: any) => {
      return data.bill_amount ? `₹${data.bill_amount}` : '-';
    }
  }),
  new TableColumn({
    columnKey: "processed_at",
    columnName: "Bill Date",
    columnType: "format",
    order: 3,
    cellFormatFn: (data: any) => {
      return data.processed_at ? moment(new Date(data.processed_at)).format("DD/MM/YYYY") : '-';
    }
  }),
  new TableColumn({
    columnKey: "redeemed_point",
    columnName: "Redeemed Points",
    columnWidth: "150px",
    columnType: "format",
    order: 4,
    cellFormatFn: (data: any) => {
      return data.redeemed_point ? data.redeemed_point : '-';
    }
  }),
  new TableColumn({
    columnKey: "earned_point",
    columnName: "Earned Points",
    columnWidth: "150px",
    columnType: "format",
    order: 5,
    cellFormatFn: (data: any) => {
      return data.earned_point ? data.earned_point : '-';
    }
  }),
  new TableColumn({
    columnKey: "expiry_date",
    columnName: "Expiry Date",
    columnType: "format",
    order: 3,
    cellFormatFn: (data: any) => {
      return data.expiry_date ? moment(new Date(data.expiry_date)).format("DD/MM/YYYY") : '-';
    }
  }),
  new TableColumn({
    columnKey: "status",
    columnName: "Expiry Status",
    columnType: "format",
    columnWidth: "150px",
    order: 8,
    cellFormatFn: (data: any) => {
      return `<span class="capitalize ${returnWalletHistoryStatusClass(data.status)} ">${data.status}</span>`
    }
  })
]


export const cashierTableConfig: TableModel = new TableModel(
  {
    columns: tableColumns,
    data: [
    ],
    mobileResponsiveCard: true,
    showIndexColumn: true,
    sortKey: 'id',
    sortDirection: 'desc',
  }
);