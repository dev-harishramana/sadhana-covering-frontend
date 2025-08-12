import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { addToCart } from '../api/cartService';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState(""); // 🆕 For showing messages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error loading product:', err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login or register to add items to your cart.");
      return;
    }

    try {
      await addToCart(product._id, quantity);
      setMessage("✅ Added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      setMessage("❌ Failed to add to cart.");
    }
  };

  if (!product) return <p className="loading-text">Loading...</p>;

  return (
    <div className="product-details">
      {/* Back button */}
      <button
        onClick={() => navigate('/products')}
        style={{
          marginBottom: '1rem',
          background: 'transparent',
          border: 'none',
          color: '#D4AF37',
          fontSize: '1.5rem',
          cursor: 'pointer',
          fontWeight: 'bold',
          padding: 0,
        }}
      >
        &larr; Back
      </button>

      {/* 🆕 Message display */}
      {message && (
        <div
          style={{
            background: "#fff3cd",
            color: "#856404",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "1rem",
            border: "1px solid #ffeeba",
          }}
        >
          {message}
        </div>
      )}

      <div className="product-details-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />

        <div className="product-info">
          <div className="product-header">
            <h2>{product.name}</h2>
            <p className="price">₹{product.price}</p>
          </div>

          <p className="description">{product.description}</p>

          {product.countInStock > 0 && (
            <div className="stock-buttons-container">
              <div className="stock-quantity-container">
                <p className="in-stock">In Stock: {product.countInStock}</p>
                <div className="quantity-container">
                  <label htmlFor="quantity">Quantity: </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="quantity-select"
                  >
                    {[...Array(Math.min(10, product.countInStock)).keys()].map(
                      (x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <div className="product-buttons">
                <button
                  onClick={handleAddToCart}
                  disabled={product.countInStock === 0}
                  className="gold-button"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate('/cart')}
                  className="gold-outline-button"
                >
                  Go to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
