import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/place-order');
  };

  return (
    <div>
      <h2>Select Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="radio" name="method" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} />
          Cash on Delivery
        </label>
        <label>
          <input type="radio" name="method" value="Stripe" checked={paymentMethod === 'Stripe'} onChange={(e) => setPaymentMethod(e.target.value)} />
          Stripe
        </label>
        <label>
          <input type="radio" name="method" value="Razorpay" checked={paymentMethod === 'Razorpay'} onChange={(e) => setPaymentMethod(e.target.value)} />
          Razorpay
        </label>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
