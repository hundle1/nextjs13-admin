"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, OrderColumn } from "./columns";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {
  return (
    <>
      <Heading title={`Đơn Hàng (${data.length})`} description="Tra cứu và kiểm soát trạng thái đơn hàng" />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};
