"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import  BillboardImage  from "./billboard-images";


export type BillboardColumn = {
  id: string;
  imageUrl: string;
  label: string;
  createdAt: string;
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    header: "Ảnh nền",
    cell: ({ row }) => <BillboardImage/>
    // accessorKey: "imageUrl",
  },
  {
    accessorKey: "label",
    header: "Tên nhãn",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
