import prismadb from "@/lib/prismadb";

import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params
}: {
  params: { productId: string, storeId: string }
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    }
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const details = await prismadb.detail.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const actors = await prismadb.actor.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  // const files = await prismadb.file.findMany({
  //   where: {
  //     productId: params.productId,
  //   }
  // });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
          categories={categories} 
          actors={actors}
          details={details}
          // files={files}
          initialData={product}
        />
      </div>
    </div>
  );
}

export default ProductPage;
