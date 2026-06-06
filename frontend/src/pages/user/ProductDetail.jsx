import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Dummy data: In the future, this will be replaced by API/Context data
  const products = [
    { id: 1, name: 'Premium Watch', price: '₹120', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', description: 'A sleek, premium watch perfect for any occasion.' },
    { id: 2, name: 'Running Shoes', price: '₹80', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', description: 'High-performance running shoes designed for comfort and speed.' },
  ];

  const product = products.find((p) => p.id === parseInt(id));

  // Quantity Handlers
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Back Navigation */}
      <Link to="/" className="text-slate-500 hover:text-slate-900 mb-8 inline-flex items-center gap-2 font-medium transition">
        ← Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="bg-slate-100 rounded-2xl overflow-hidden shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">{product.name}</h1>
            <p className="text-3xl font-bold text-blue-600 mt-2">{product.price}</p>
          </div>

          <p className="text-slate-600 leading-relaxed text-lg">
            {product.description}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-6 py-4">
            <span className="font-semibold text-slate-700">Quantity:</span>
            <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
              <button
                onClick={decrement}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
              >
                -
              </button>
              <span className="px-6 font-bold text-slate-900">{quantity}</span>
              <button
                onClick={increment}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition active:scale-[0.99] cursor-pointer">
            Add {quantity} to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail