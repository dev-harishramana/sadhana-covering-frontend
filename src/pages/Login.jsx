import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate(res.data.user.role === "admin" ? "/admin" : "/home");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login-wrapper">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="login-btn">Login</button>
      </form>
      <p className="register-link">
        Don’t have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
