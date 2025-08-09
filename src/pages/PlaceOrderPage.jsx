import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api';
import { fetchCart } from '../api/cartService';
import { clearCart } from '../api/cartService'; // import at the top

export default function PlaceOrderPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
  const paymentMethod = localStorage.getItem('paymentMethod');

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await fetchCart();
        setCart(res.data.items || []);
      } catch (err) {
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const total = cart.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

const placeOrder = async () => {
  try {
    // Transform cart so product is just the ID
    const formattedOrderItems = cart.map(item => ({
      product: item.product._id,  // ✅ Only send ObjectId
      quantity: item.quantity
    }));

    await API.post('/orders', {
      orderItems: formattedOrderItems,
      shippingAddress,
      paymentMethod,
      totalPrice: total,
    });

    await clearCart(); // ✅ Clear cart after successful order

    navigate('/order-success');
  } catch (err) {
    console.error('Order failed:', err);
  }
};


  


  if (loading) return <p>Loading...</p>;

  return (
    <div className="place-order">
      <h2>Order Review</h2>
      <div>
        <h4>Shipping Address:</h4>
        <p>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</p>
      </div>
      <div>
        <h4>Payment Method:</h4>
        <p>{paymentMethod}</p>
      </div>
      <div>
        <h4>Items:</h4>
        {cart.map((item, index) => (
          <div key={index}>
            <p>{item.product.name} x {item.quantity} = ₹{item.quantity * item.product.price}</p>
          </div>
        ))}
        <strong>Total: ₹{total}</strong>
      </div>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}
