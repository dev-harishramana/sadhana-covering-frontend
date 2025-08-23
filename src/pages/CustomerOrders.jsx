import { useEffect, useState } from "react";
import API from "../api";

export default function CustomerOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

    const togglePacked = async (id) => {
    try {
      await API.put(`/orders/${id}/packed`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchOrders(); // refresh orders
    } catch (err) {
      console.error("Error updating packed status", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📦 Customer Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-500">
          No orders found
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-xl">
          <table className="w-full border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Items</th>
                <th className="px-4 py-3 text-left">Total Price</th>
                <th className="px-4 py-3 text-left">Payment</th>
                <th className="px-4 py-3 text-left">Shipping</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="p-3 border">Packed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-3 text-sm font-mono text-gray-700">
                    {order._id.slice(-6)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.user?.name || "Unknown"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {order.orderItems.map((item, i) => (
                      <div key={i}>
                        {item.product?.name || "Deleted"} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    ₹{order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.paymentMethod}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {order.shippingAddress?.address}, {order.shippingAddress?.city}
                    <br />
                    <span className="text-gray-500">
                      {order.shippingAddress?.mobileNumber}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                                  <td className="p-3 border text-center">
                  <button
                    onClick={() => togglePacked(order._id)}
                    className={`px-4 py-2 rounded-lg font-semibold text-white ${
                      order.packed ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {order.packed ? "Packed ✅" : "Unpacked ❌"}
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
