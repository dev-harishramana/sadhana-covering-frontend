import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/home">Sadhana Covering</Link>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
        <Link to="/order-history" onClick={() => setMenuOpen(false)}>Order</Link>
        <button
          onClick={() => {
            handleLogout();
            setMenuOpen(false);
          }}
          className="logout-btn"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
