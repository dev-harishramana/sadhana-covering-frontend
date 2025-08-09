import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchCart,
  updateCartItem,
  removeFromCart
} from '../api/cartService';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const loadCart = async () => {
    const res = await fetchCart();
    setCart(res.data.items || []);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleUpdate = async (productId, quantity) => {
    await updateCartItem(productId, quantity);
    loadCart();
  };

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
    loadCart();
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>No items in cart</p>}
      {cart.map((item) => (
        <CartItem
          key={item.product._id}
          item={item}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
        />
      ))}
      {cart.length > 0 && (
        <button onClick={() => navigate('/shipping')}>
          Go to Place Order
        </button>
      )}
    </div>
  );
};

const CartItem = ({ item, onUpdate, onRemove }) => {
  const [inputQty, setInputQty] = useState(item.quantity);

  useEffect(() => {
    setInputQty(item.quantity); // Keep in sync when cart reloads
  }, [item.quantity]);

  const handleBlurOrEnter = () => {
    const parsedQty = parseInt(inputQty);
    if (!isNaN(parsedQty) && parsedQty >= 1 && parsedQty !== item.quantity) {
      onUpdate(item.product._id, parsedQty);
    } else {
      setInputQty(item.quantity); // Revert to original if invalid
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h4>{item.product.name}</h4>
      <p>
        Qty:{' '}
        <input
          type="number"
          min="1"
          value={inputQty}
          onChange={(e) => setInputQty(e.target.value)}
          onBlur={handleBlurOrEnter}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.target.blur(); // trigger onBlur
            }
          }}
        />
      </p>
      <button onClick={() => onRemove(item.product._id)}>Remove</button>
    </div>
  );
};

export default CartPage;
