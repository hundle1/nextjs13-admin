import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import { SettingsForm } from "./components/settings-form";

const SettingsPage = async ({
  params
}: {
  params: { storeId: string, walletId: string},
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId
    }
  });

  if (!store) {
    redirect('/');
  }

  const wallets = await prismadb.wallet.findMany({
    where: {
      id: params.walletId,
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm 
          initialData={store} 
          wallets={wallets}
        />
      </div>
    </div>
  );
}

export default SettingsPage;
