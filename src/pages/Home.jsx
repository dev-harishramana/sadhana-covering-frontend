import { useNavigate } from 'react-router-dom';



export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <p>This is the protected Home page.</p>
        <button onClick={() => navigate('/products')}>
          View Products
        </button>
    </div>
  );
}
