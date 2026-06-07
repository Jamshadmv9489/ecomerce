import { Link } from "react-router-dom";

import { useProducts } from "../../context/ProductContext";

import HeroSection from "../../components/common/HeroSection";
import ProductGrid from "../../components/product/ProductGrid";

const Home = () => {
  const { products, loading, error } = useProducts();

  const trendingProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <HeroSection />

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Trending Items</h2>
          <Link
            to="/products"
            className="text-blue-600 font-semibold hover:underline cursor-pointer"
          >
            View All
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">Loading trending items...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : (
          <ProductGrid products={trendingProducts} />
        )}
      </section>
    </div>
  )
}

export default Home;