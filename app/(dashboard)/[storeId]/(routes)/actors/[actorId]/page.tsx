import prismadb from "@/lib/prismadb";

import { ActorForm } from "./components/color-form";

const ActorPage = async ({
  params
}: {
  params: { actorId: string }
}) => {
  const actor = await prismadb.actor.findUnique({
    where: {
      id: params.actorId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ActorForm initialData={actor} />
      </div>
    </div>
  );
}

export default ActorPage;
