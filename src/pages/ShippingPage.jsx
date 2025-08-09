import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShippingPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('shippingAddress', JSON.stringify(form));
    navigate('/payment');
  };

  return (
    <div>
      <h2>Shipping Address</h2>
      <form onSubmit={handleSubmit}>
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
        <input name="postalCode" placeholder="Postal Code" value={form.postalCode} onChange={handleChange} required />
        <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
