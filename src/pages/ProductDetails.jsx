import { useState, useEffect } from 'react';
import { useParams,  useNavigate } from 'react-router-dom';
import API from '../api';
import { addToCart } from '../api/cartService';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // ✅ default quantity is 1
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
    await addToCart(product._id, quantity);
    alert('Added to cart!');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ₹{product.price}</p>
      <p>{product.description}</p>

      {/* ✅ Stock status */}
      {product.countInStock > 0 ? (
        <p style={{ color: 'green' }}>In Stock: {product.countInStock}</p>
      ) : (
        <p style={{ color: 'red' }}>Out of Stock</p>
      )}

      {/* ✅ Quantity selector */}
      {product.countInStock > 0 && (
        <>
          <label>
            Quantity:{' '}
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[...Array(Math.min(10, product.countInStock)).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </label>
          <br /><br />
        </>
      )}

      {/* ✅ Add to Cart Button */}
      <button 
        onClick={handleAddToCart} 
        disabled={product.countInStock === 0} 
        style={{ opacity: product.countInStock === 0 ? 0.5 : 1 }}
      >
        Add to Cart
        </button>

        <button onClick={() => navigate('/cart')}>
          Go to Cart
        </button>
              
    </div>
  );
}
