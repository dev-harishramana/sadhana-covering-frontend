import { useEffect, useState } from 'react';
import API from '../api';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders/myorders');
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (orders.length === 0) {
    return <p>No past orders found.</p>;
  }

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
          <div>
            <strong>Items:</strong>
            <ul>
              {order.orderItems.map((item, index) => (
                <li key={index}>
                  {item.product?.name} x {item.quantity} = ₹{item.quantity * item.product?.price}
                </li>
              ))}
            </ul>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
