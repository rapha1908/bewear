import Link from "next/link";
import Image from "next/image";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToMoney } from "@/helpers/money";

interface ProductItemProps {
    product: (typeof productTable.$inferSelect & {
        variants: (typeof productVariantTable.$inferSelect)[]
    });
}


const ProductItem = ({product}: ProductItemProps) =>{
    const firstVariant = product.variants[0];
    return(
        <Link href="/" className="flex flex-col gap-4">
            <Image
             src={firstVariant.imageUrl} 
             alt={firstVariant.name} 
             width={200} 
             height={200} 
             className="rotate-6" />

             <div className="flex flex-col gap-1 max-w-[200px]">
                <p className="truncate text-sm font-medium">
                    {product.name}
                </p>
                <p className="truncate text-xs text-muted-foreground font-medium">
                    {product.description}
                </p>
                <p className="truncate text-sm font-semibold">
                    {formatCentsToMoney(firstVariant.priceInCents) }
                </p>

             </div>
             
        </Link>
    )
}

export default ProductItem;