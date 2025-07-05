import ProductCard from "@/app/components/ProductCard";
import { fetchProducts, type Product } from "./actions/getProducts";
import { Divider } from "primereact/divider";

export default async function ProductsPage() {
  const products: Product[] = await fetchProducts();

  return (
    <div className="p-6 dark:bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">
        Product List
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Divider />

      <div className="flex justify-end mt-4"></div>
    </div>
  );
}
