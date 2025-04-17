import moment from "moment";
import { TableColumn, TableModel } from "../../model";
import { returnWalletHistoryStatusClass } from "../../lib/lib";

const tableColumns: TableColumn[] = [
  new TableColumn({
    columnKey: "bill_no",
    columnName: "Bill No",
    columnType: "format",
    order: 1,
    cellFormatFn: (data: any) => {
        return `<span class="capitalize">${data.bill_no || data.point_category?.split("_")?.join(" ") || '-'} </span>`;
    }
  }),
  new TableColumn({
    columnKey: "bill_amount",
    columnName: "Bill Amount",
    columnType: "format",
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
    columnType: "format",
    order: 4,
    cellFormatFn: (data: any) => {
        return data.redeemed_point ? data.redeemed_point : '-';
    }
  }),
  new TableColumn({
    columnKey: "earned_point",
    columnName: "Earned Points",
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
    sortDirection: 'asc',
  }
);