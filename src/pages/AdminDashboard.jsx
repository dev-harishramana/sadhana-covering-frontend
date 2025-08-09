import { useEffect, useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";


export default function AdminDashboard() {

    const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchProducts(); // refresh
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <Link to="/admin/add" className="btn">+ Add Product</Link>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th><th>Name</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td><img src={p.image} alt={p.name} height={50} /></td>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>
                <Link to={`/admin/edit/${p._id}`} className="btn">Edit</Link>
                <button className="btn btn-danger" onClick={() => deleteProduct(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        <button onClick={() => navigate('/login')}>
          Login
        </button>
    </div>
  );
}
