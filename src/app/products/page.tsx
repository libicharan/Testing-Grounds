import { getProducts } from "./actions/getProducts";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Product List</h1>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}
