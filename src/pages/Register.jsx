import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="register-wrapper">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="register-btn">Register</button>
      </form>
      <p className="login-link">
        Don’t have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
