import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ActorColumn } from "./components/columns"
import { ActorClient } from "./components/client";

const ActorsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const actors = await prismadb.actor.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedActors: ActorColumn[] = actors.map((item) => ({
    id: item.id,
    name: item.name,
    nickname: item.nickname,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ActorClient data={formattedActors} />
      </div>
    </div>
  );
};

export default ActorsPage;
