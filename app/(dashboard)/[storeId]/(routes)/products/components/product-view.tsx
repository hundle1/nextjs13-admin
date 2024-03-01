"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import BillboardImage from "../../billboards/components/billboard-images";

export type ProductInfor = {
  id: string;
  name: string;
  price: string;
  supply: string;
  productinf: string;
  // file: string;
  category: string;
  detail: string;
  actor: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
}

export const Pview: ColumnDef<ProductInfor>[] = [
  {
    accessorKey: "image",
    header: "image",
    cell: ({ row }) => <BillboardImage/>,
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
    accessorKey: "category",
    header: "Danh Mục",
  },
  {
    accessorKey: "detail",
    header: "Thông Tin",
  },
  {
    accessorKey: "actor",
    header: "Tác Giả/Đội Nhóm",
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
