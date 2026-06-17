import { useEffect, useState } from "react";
import { fetchAllOrders, updateOrderStatus } from "../../services/adminService";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const orders = await fetchAllOrders();
      console.log("orders", orders);

      setOrders(orders);

    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

const handleStatusChange = async (orderId, newStatus) => {
  try {
    await updateOrderStatus(orderId, newStatus);
    
loadOrders();

    alert("Order status updated successfully!");
  } catch (error) {
    console.error("Update failed:", error);
    alert("Error updating status");
  }
};

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

      <div className="grid gap-4">
        {orders?.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          orders?.map((order) => (
            <div key={order._id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:justify-between md:items-start gap-4 transition-all hover:border-indigo-100">
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-800">Order #{order._id.slice(-8)}</h3>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {order.isPaid ? "PAID" : "UNPAID"}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Customer: {order?.user?.name || "Unknown"}</p>
                <p className="text-xs text-gray-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>

                {/* Items List */}
                <div className="mt-2">
                  {order.items?.slice(0, 2).map((item, i) => (
                    <p key={i} className="text-xs text-gray-600">• {item.product} ({item.quantity})</p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <p className="font-bold text-indigo-600 text-lg">₹{order.totalPrice}</p>

                <select
                  value={order.orderStatus}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  disabled={order.orderStatus === 'Delivered' || order.orderStatus === 'Cancelled'}
                  className={`border border-gray-300 p-2 rounded-xl text-sm ${(order.orderStatus === 'Delivered' || order.orderStatus === 'Cancelled')
                    ? 'bg-gray-100 cursor-not-allowed opacity-70'
                    : 'bg-white'
                    }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ManageOrders