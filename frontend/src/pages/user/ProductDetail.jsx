import { useEffect, useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/authContext';

import { getProductBySlug } from '../../services/productService';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);

  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await getProductBySlug(slug);
        setProduct(response.data);
        setMainImage(response.data?.images?.[0]?.url);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return null;
  if (!product) return <div>Product not found!</div>;

  // Quantity Handlers
  const increment = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1)
    }
  };
  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  };

  const handleAddToCart = () => {
    // 1. Check if the user is logged in before adding to the cart
    if (!user) {
      // Redirect to the login page if not authenticated:
      navigate('/login');
      return;
    }
    alert("Item added to cart successfully!");
  };


  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Back Navigation */}
      <Link to="/" className="text-slate-500 hover:text-slate-900 mb-8 inline-flex items-center gap-2 font-medium transition">
        ← Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col gap-4">

          {/* Main Image */}
          <div
            className="bg-slate-100 rounded-2xl overflow-hidden shadow-sm w-full"
            style={{ aspectRatio: "1/1" }}
          >
            <img
              src={mainImage || 'default-image.jpg'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {product?.images?.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img.url)}
                className={`border-2 rounded-lg overflow-hidden transition-all cursor-pointer hover:scale-105 hover:border-slate-400 ${mainImage === img.url ? 'border-blue-600' : 'border-transparent'
                  }`}
                style={{ aspectRatio: "1/1" }}
              >
                <img
                  src={img.url}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">{product.name}</h1>
            <p className="text-3xl font-bold text-blue-600 mt-2">₹{product.price}</p>
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
              <span className="px-6 font-bold text-slate-900">{product.stock === 0 ? 0 : quantity}</span>
              <button
                onClick={increment}
                disabled={quantity >= product.stock}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 transition cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className={`w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition active:scale-[0.99] cursor-pointer 
              ${product.stock === 0
                ? "bg-gray-400 text-slate-500 cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-slate-800"}`}
            onClick={handleAddToCart}
          >
            {product.stock === 0 ? "Out of Stock" : `Add ${quantity} to Cart`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail