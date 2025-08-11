import { useNavigate } from "react-router-dom";
import "../index.css";
import bgImage from "../assets/home.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="home-content">
        <h1 className="home-caption">
          Celebrate Every Moment with Elegant Gold Covering Designs
        </h1>
        <p className="home-subtext">
          Crafted to perfection, bringing you timeless beauty at an affordable price.
        </p>
        <button
          className="view-products-btn"
          onClick={() => navigate("/products")}
        >
          View Products
        </button>
      </div>
    </div>
  );
}

