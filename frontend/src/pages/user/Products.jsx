import { useProducts } from "../../context/ProductContext";
import ProductGrid from "../../components/product/ProductGrid";

const Products = () => {
  const { products, loading, error } = useProducts();

  const sortedProducts = [...products].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">All Products</h1>

      {loading ? (
        <div className="text-center py-20">Loading all products...</div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">{error}</div>
      ) : (
        <ProductGrid products={sortedProducts} />
      )}
    </div>

  )
}

export default Products;