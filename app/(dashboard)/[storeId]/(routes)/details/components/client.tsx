"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, DetailColumn } from "./columns";

interface DetailsClientProps {
  data: DetailColumn[];
}

export const DetailsClient: React.FC<DetailsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Thông tin mô tả sản phẩm (${data.length})`} description="Cài đặt sẵn các thông tin mô tả cho các sản phẩm của bạn" />
        <Button onClick={() => router.push(`/${params.storeId}/details/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Thêm Mới
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="Phần API" />
      <Separator />
      <ApiList entityName="details" entityIdName="detailId" />
    </>
  );
};
