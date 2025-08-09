import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function EditProductForm() {
  const { id } = useParams(); // product ID from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    image: "",
    description: "",
    category: "",
    countInStock: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/products/${id}`, product);
      navigate("/admin"); // or navigate("/products");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />
        <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Price" required />
        <input name="image" value={product.image} onChange={handleChange} placeholder="Image URL" />
        <input name="description" value={product.description} onChange={handleChange} placeholder="Description" />
        <input name="category" value={product.category} onChange={handleChange} placeholder="Category" />
        <input name="countInStock" type="number" value={product.countInStock} onChange={handleChange} placeholder="Stock" />
        <button type="submit">Update Product</button>
      </form>

        <button onClick={() => navigate('/login')}>
          Login
        </button>
    </div>
  );
}
