import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../../context/CartContext';

import { createOrder } from '../../services/orderService';
import { initiateRazorpayPayment, verifyRazorpayPayment } from '../../services/paymentService';

import Button from '../../components/common/Button';

const Checkout = () => {
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const total = cartItems?.totalPrice;

  useEffect(() => {
    // Load shipping address from local storage
    const savedAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    if (!savedAddress) navigate('/address');
    setAddress(savedAddress);
  }, [navigate]);

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      // Step 1: Create order in database
      const orderResponse = await createOrder({
        shippingAddress: address,
        paymentMethod,
        isDirectCheckout: false
      });

      const myOrderId = orderResponse.data._id;

      if (paymentMethod === "Razorpay") {
        // Step 2: Get Razorpay order ID
        const rzpOrder = await initiateRazorpayPayment(myOrderId);

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          order_id: rzpOrder.data.id,
          amount: Math.round(total * 100), // Ensure amount is in paise
          currency: "INR",
          // Step 3: Handle payment success
          handler: async (response) => {
            try {
              await verifyRazorpayPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: myOrderId,
              });
              alert("Payment Successful!");
              navigate('/order-success');
            } catch (err) {
              console.error("Verification error:", err);
              alert("Verification Failed");
            } finally {
              setLoading(false);
            }
          },
          modal: {
            ondismiss: () => setLoading(false) // Reset loading if window is closed
          }
        };
        new window.Razorpay(options).open();
      } else {
        // Handle COD flow
        navigate('/order-success');
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      alert(err.message || "Something went wrong");
    }
  };

  if (!address) return <div>Loading...</div>;
  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Address & Payment Method Selection */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <div className="border p-4 rounded-xl">
          <h3 className="font-bold mb-2">Shipping to:</h3>
          <p>{address.street}, {address.city}</p>
          <p>{address.state}, {address.postalCode}</p>
          <p>Phone: {address.phone}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold">Payment Method</h3>
          <label className="flex items-center gap-2 border p-3 rounded-lg">
            <input type="radio" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} />
            Cash on Delivery
          </label>
          <label className="flex items-center gap-2 border p-3 rounded-lg">
            <input type="radio" value="Razorpay" checked={paymentMethod === "Razorpay"} onChange={(e) => setPaymentMethod(e.target.value)} />
            Razorpay
          </label>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-slate-50 p-6 rounded-2xl h-fit">
        <h3 className="font-bold text-lg mb-4">Order Summary</h3>
        <div className="flex justify-between mb-4 border-b pb-2">
          <span>Total Amount</span>
          <span className="font-bold text-xl">₹{total}</span>
        </div>
        <Button onClick={handlePlaceOrder} loading={loading}>
          Place Order
        </Button>
      </div>
    </div>
  )
}

export default Checkout