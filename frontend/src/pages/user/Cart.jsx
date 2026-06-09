import { useCart } from "../../context/CartContext";

const Cart = () => {
  // Initial dummy state for cart items
  const { cartItems, updateQuantity, removeItem } = useCart();



  const items = cartItems?.items || [];
  const total = cartItems?.totalPrice || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">My Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {items?.length === 0 ? (
            <p className="text-slate-500">Your cart is empty.</p>
          ) : (
            items?.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl shadow-sm">
                <img src={item?.product?.images[0]?.url} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{item.product.name}</h3>
                  <p className="text-blue-600 font-bold">₹{item.product.price}</p>
                </div>

                {/* Quantity Controller */}
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 transition"
                  >
                    -
                  </button>
                  <span className="px-6 font-bold text-slate-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 transition disabled:opacity-50"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.product._id)}
                  className="text-red-500 hover:text-red-700 ml-4 font-medium transition"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Order Summary Section */}
        <div className="bg-slate-50 p-8 rounded-3xl h-fit border border-slate-100">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-bold">₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold text-blue-600">₹{total.toLocaleString()}</span>
            </div>
          </div>
          <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg active:scale-95">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart