"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, ActorColumn } from "./columns";

interface ActorClientProps {
  data: ActorColumn[];
}

export const ActorClient: React.FC<ActorClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Tác giả sản phẩm (${data.length})`} description="Manage Actors for your products" />
        <Button onClick={() => router.push(`/${params.storeId}/actors/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Thêm Tác Giả
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Actors" />
      <Separator />
      <ApiList entityName="actors" entityIdName="actorId" />
    </>
  );
};
