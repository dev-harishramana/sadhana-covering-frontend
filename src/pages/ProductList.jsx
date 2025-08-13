import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(""); // selected category
  const [categories, setCategories] = useState([]); // list of unique categories
  const [searchTerm, setSearchTerm] = useState(""); // search query
  const [sortOption, setSortOption] = useState(""); // sort option

  const fetchProducts = async (selectedCategory = "") => {
    try {
      const res = await API.get(
        `/products${selectedCategory ? `?category=${selectedCategory}` : ""}`
      );
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

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === "highToLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

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
        <div className="category-filter" style={{ flex: "1 1 200px" }}>
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: "6px" }}
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
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

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((p) => (
            <div key={p._id} className="product-card">
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>

              {p.countInStock > 0 ? (
                <p style={{ color: "green" }}>Stock Available: {p.countInStock}</p>
              ) : (
                <p style={{ color: "red" }}>Out of Stock</p>
              )}

              <Link to={`/products/${p._id}`} className="details-button">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
