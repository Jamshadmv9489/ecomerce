import HeroSection from "../../components/common/HeroSection";
import ProductGrid from "../../components/product/ProductGrid";

const Home = () => {

    const TRENDING_PRODUCTS = [
        { id: 1, name: 'Premium Watch', price: '120', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', description: 'A sleek, premium watch perfect for any occasion.' },
        { id: 2, name: 'Running Shoes', price: '80', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', description: 'High-performance running shoes designed for comfort and speed.' },
        // ... other products
    ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <HeroSection />

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Trending Items</h2>
          <button className="text-blue-600 font-semibold hover:underline cursor-pointer">View All</button>
        </div>
        <ProductGrid products={TRENDING_PRODUCTS} />
      </section>
    </div>
  )
}

export default Home