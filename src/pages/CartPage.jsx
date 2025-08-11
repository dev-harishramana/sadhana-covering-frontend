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
    <div className="cart-container">
      <h2 className="cart-heading">Your Cart</h2>

      {cart.length === 0 && <p className="empty-cart-text">No items in cart</p>}

      {cart.map((item) => (
        <CartItem
          key={item.product._id}
          item={item}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
        />
      ))}

      {cart.length > 0 && (
        <button
          onClick={() => navigate('/shipping')}
          className="place-order-btn"
        >
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
    <div className="cart-item">
      <div className="cart-item-info">
        <h4 className="cart-item-name">{item.product.name}</h4>

        <label htmlFor={`qty-${item.product._id}`} className="qty-label">
          Qty:
        </label>
        <input
          id={`qty-${item.product._id}`}
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
          className="qty-input"
        />
      </div>
      <button
        onClick={() => onRemove(item.product._id)}
        className="remove-btn"
        aria-label={`Remove ${item.product.name} from cart`}
      >
        Remove
      </button>
    </div>
  );
};

export default CartPage;
