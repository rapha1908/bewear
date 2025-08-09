import Image from "next/image";

import { Header } from "@/components/commun/header";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import ProductList from "@/components/commun/product-list";
import CategorySelector from "@/components/commun/category-selector";
import { desc } from "drizzle-orm";
import { productTable } from "@/db/schema";
import Footer from "@/components/commun/footer";

const Home = async () => {

  const products = await db.query.productTable.findMany({
    with:{
      variants: true,
    }
  });

const newlyCreatedProducts = await db.query.productTable.findMany({
  orderBy: [desc(productTable.createdAt)],
  limit: 4,
  with:{
    variants: true,
  }});


  const categories = await db.query.categoryTable.findMany({});

  console.log("Products:", products);
  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="p-5">
          <Image
          src="/banner-01.png"
          alt="Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vw"
          className="w-full h-auto"
          />
        </div>

        <ProductList products={products} title="Os mais vendidos"/>

         <div className="px-5">
          <CategorySelector categories={categories} />
        </div>


        <div className="px-5">
          <Image
          src="/banner-02.png"
          alt="Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vw"
          className="w-full h-auto"
          />
        </div>
      </div>

      <ProductList products={newlyCreatedProducts} title="Novidades"/>

      <Footer />
    </>
  );
};

export default Home;
