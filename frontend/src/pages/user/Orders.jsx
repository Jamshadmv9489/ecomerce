import { useEffect } from 'react';

import { useOrder } from '../../context/OrderContext';


const Orders = () => {

  const { ordersHistory, fetchOrdersHistory, loading } = useOrder();

  // Fetch order history if empty on component mount
  useEffect(() => {
    if (ordersHistory.length === 0) {
      fetchOrdersHistory();
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {ordersHistory.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {ordersHistory?.map((order) => (
            <div key={order._id} className="border p-4 rounded-xl shadow-sm hover:shadow-md transition">

              {/* Order credentials and payment status badge */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">Order ID: {order._id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.isPaid
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {order.isPaid ? 'Paid' : 'Pending'}
                </span>
              </div>

              {/* Ordered items listing */}
              <div className="space-y-3 mb-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={item?.product?.images[0]?.url}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.product?.name || "Product Name"}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order financial summary and metadata */}
              <div className="flex justify-between items-center border-t pt-3">
                <div>
                  <p className="font-semibold">Total Amount: ₹{order.totalPrice}</p>
                  <p className="text-sm text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <button className="text-blue-600 font-bold hover:underline">View Details</button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders