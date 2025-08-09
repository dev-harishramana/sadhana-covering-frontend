import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function CreateProductForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/products", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/admin"); // back to admin dashboard
    } catch (err) {
      console.error("Error creating product:", err);
    }
  };

  return (
    <div className="create-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="countInStock"
          placeholder="Count In Stock"
          value={form.countInStock}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn">Add Product</button>
      </form>

        <button onClick={() => navigate('/login')}>
          Login
        </button>

    </div>
  );
}
