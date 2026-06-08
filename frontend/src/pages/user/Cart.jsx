import { useState } from "react";

const Cart = () => {
  // Initial dummy state for cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Premium Headphones", price: 2999, quantity: 1, image: "https://via.placeholder.com/150", stock: 5 },
    { id: 2, name: "Mechanical Keyboard", price: 4500, quantity: 1, image: "https://via.placeholder.com/150", stock: 3 },
  ]);

  /**
   * Updates the quantity of a specific item in the cart.
   * Ensures the quantity remains within [1, item.stock] range.
   */
  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          // Clamp value between 1 and available stock
          return { ...item, quantity: Math.max(1, Math.min(newQty, item.stock)) };
        }
        return item;
      })
    );
  };

  // Remove an item from the cart by its ID
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate subtotal for the entire cart
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">My Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-slate-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl shadow-sm">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-blue-600 font-bold">₹{item.price}</p>
                </div>

                {/* Quantity Controller */}
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 transition"
                  >
                    -
                  </button>
                  <span className="px-6 font-bold text-slate-900">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    disabled={item.quantity >= item.stock}
                    className="px-4 py-2 bg-slate-50 hover:bg-slate-100 transition disabled:opacity-50"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
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
              <span className="font-bold">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="text-lg font-bold">Total</span>
              <span className="text-2xl font-bold text-blue-600">₹{subtotal.toLocaleString()}</span>
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