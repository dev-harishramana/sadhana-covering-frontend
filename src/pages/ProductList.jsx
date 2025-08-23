import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(""); // selected category
  const [categories, setCategories] = useState([]); // list of unique categories
  const [searchTerm, setSearchTerm] = useState(""); // search query
  const [sortOption, setSortOption] = useState(""); // sort option

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);

      const allCategories = [
        ...new Set(res.data.map((p) => p.category).filter(Boolean)),
      ];
      setCategories(allCategories);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getFilteredSortedProducts = (cat) => {
    let filtered = products.filter(
      (p) =>
        (cat ? p.category === cat : true) &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "lowToHigh") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  return (
    <div className="product-list">
      <h2>All Products</h2>

      {/* Search Bar */}
      <div
        className="search-bar"
        style={{ marginBottom: "1rem", maxWidth: "400px", width: "100%" }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
        />
      </div>

      {/* Filters */}
      <div
        className="filters"
        style={{
          marginBottom: "1rem",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        {/* Category Filter */}
        <div className="category-filter" style={{ flex: "1 1 100%", marginBottom: "1rem" }}>
          <h4 style={{ marginBottom: "0.5rem" }}>Category</h4>
          <div className="category-buttons">
            <button
              onClick={() => setCategory("")}
              className={category === "" ? "active" : ""}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={category === cat ? "active" : ""}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Filter */}
        <div className="sort-filter" style={{ flex: "1 1 200px" }}>
          <label htmlFor="sort">Sort by: </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ width: "100%", padding: "6px" }}
          >
            <option value="">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products grouped by category */}
{category
  ? (
    <div className="category-section" style={{ marginBottom: "2rem" }}>
      <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>{category}</h3>
      <div className="products-grid">
        {getFilteredSortedProducts(category).length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          getFilteredSortedProducts(category).map((p) => (
            <div key={p._id} className="product-card">
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              {p.countInStock > 0 ? (
                <p style={{ color: "green", fontSize: "0.70rem" }}>
                  Stock Available: {p.countInStock}
                </p>
              ) : (
                <p style={{ color: "red", fontSize: "0.70rem" }}>Out of Stock</p>
              )}
              <Link to={`/products/${p._id}`} className="details-button">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
  : (
    categories.map((cat) => {
      const catProducts = getFilteredSortedProducts(cat);
      if (catProducts.length === 0) return null;

      return (
        <div key={cat} className="category-section" style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>{cat}</h3>
          <div className="products-grid">
            {catProducts.map((p) => (
              <div key={p._id} className="product-card">
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <p>₹{p.price}</p>
                {p.countInStock > 0 ? (
                  <p style={{ color: "green", fontSize: "0.70rem" }}>
                    Stock Available: {p.countInStock}
                  </p>
                ) : (
                  <p style={{ color: "red", fontSize: "0.70rem" }}>Out of Stock</p>
                )}
                <Link to={`/products/${p._id}`} className="details-button">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    })
  )
}

    </div>
  );
}
