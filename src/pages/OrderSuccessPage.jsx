import { Link } from 'react-router-dom';
import '../index.css';

export default function OrderSuccessPage() {
  return (
    <div className="success-wrapper">
      <div className="success-card">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Thank you for your purchase. We’re processing your order and will update you soon.</p>
        <div className="success-links">
          <Link className="btn-gold" to="/products">View More Products</Link>
          <Link className="btn-outline" to="/order-history">Order History</Link>
        </div>
      </div>
    </div>
  );
}
