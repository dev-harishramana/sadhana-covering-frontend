import { Link } from 'react-router-dom';

export default function OrderSuccessPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Thank you for your purchase.</p>
      <Link to="/products">View more products</Link>
      <Link to="/order-history">Order History</Link>
    </div>
  );
}
