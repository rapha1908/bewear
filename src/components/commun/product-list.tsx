import { productTable, productVariantTable } from "@/db/schema";
import ProductItem from "./product-Item";

interface ProductListProps {
    title: string;
    products: (typeof productTable.$inferSelect & {
        variants: (typeof productVariantTable.$inferSelect)[]
    })[];
}

const ProductList = async ({title, products}:ProductListProps) => {
 return (
    <div className="space-y-6">
        <h1 className="font-semibold px-5">{title}</h1>
        <div className="flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    </div>
 );
}

export default ProductList;