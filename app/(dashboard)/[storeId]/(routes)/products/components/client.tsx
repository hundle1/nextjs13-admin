"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { ProductInfor, Pview } from "./product-view";

interface ProductsClientProps {
  data: ProductInfor[];
};

export const ProductsClient: React.FC<ProductsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <> 
      <div className="flex items-center justify-between">
        <Heading title={`Danh Sách Sản Phẩm (${data.length})`} description="Thêm mới và chỉnh sửa NFTS của bạn" />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Thêm NFTS Mới
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={Pview} data={data} />
      <Heading title="API" description="API Calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
