import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: 
      { 
        product:
        {
          with:{
            variants: true
          } 
        }
      },
  });

  if (!productVariant) {
    return notFound();
  }

  const likeProducts = await db.query.productTable.findMany({
  where: eq(productTable.categoryId, productVariant.product.categoryId),
  with: {
      variants: true,
    },
});

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-5">
        <Image 
          src={productVariant.imageUrl} 
          alt={productVariant.name} 
          sizes="100vw"
          width={0}
          height={0} 
          className="h-auto w-full rounded-3xl"
        />

        <div className="p-5">
           {/*VARIANTES*/}
           <VariantSelector variants={productVariant.product.variants} selectedVariant={productVariant.slug} />

        </div>

        <div className="p-5">
          {/*DESCRIÇÃO*/}
          <h2 className="text-2xl font-bold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-sm text-muted-foreground">
            {productVariant.name}
          </h3>
          <p className="text-lg text-gray-900 font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </p>
        </div>

        <div className="p-5">
           {/*QUANTIDADE*/}

        </div>

        <div className="p-5 space-y-4 flex flex-col">
           {/*BOTOES*/}
           <Button className="rounded-full" size="lg" variant="outline">
             
              Adicionar ao carrinho
           </Button>
           <Button className="rounded-full">
            Comprar agora
           </Button>
        </div>

        <div className="p-5">
           {/*DESCRIÇÃO*/}
           <p className="text-sm">
            {productVariant.product.description}
           </p>

        </div>

        <ProductList products={likeProducts} title="Talvez voce goste" />
      </div>
    </>
  )
};

export default ProductVariantPage;