"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Sản Phẩm",
  },
  {
    accessorKey: "phone",
    header: "Số Điện Thoại",
  },
  {
    accessorKey: "address",
    header: "Địa chỉ ví",
  },
  {
    accessorKey: "totalPrice",
    header: "Tổng Thanh Toán",
  },
  {
    accessorKey: "isPaid",
    header: "Trạng Thái",
  },
];
