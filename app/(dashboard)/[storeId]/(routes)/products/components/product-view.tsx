"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type ProductInfor = {
  id: string;
  name: string;
  price: string;
  supply: string;
  // file: string;
  category: string;
  detail: string;
  color: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
}

export const Pview: ColumnDef<ProductInfor>[] = [
  {
    accessorKey: "image",
    header: "image",
  },
  {
    accessorKey: "name",
    header: "Tên NFT",
  },
  {
    accessorKey: "price",
    header: "Giá",
  },
  {
    accessorKey: "detail",
    header: "Thông Tin",
  },
  {
    accessorKey: "color",
    header: "Tác Giả",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày Tạo",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
