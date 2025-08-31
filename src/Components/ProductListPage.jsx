import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axiosInstance";
import ProductCard from "../Components/ProductCard";
import ProductModal from "../Components/ProductModal";
import ConfirmDialog from "../Components/ConfirmDialog";

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      console.log("Products API response:", res.data);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category/all");
      if (res.data.success) setCategories(res.data.categories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const requestDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/product/${deleteId}`);
      setProducts(products.filter((p) => p._id !== deleteId));
    } catch (err) {
      console.error("Error deleting product:", err);
    } finally {
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const getCategoryName = (category) => {
    if (!category) return "Unknown";
    const categoryId = typeof category === "string" ? category : category?._id;
    const cat = categories.find((c) => c._id === categoryId);
    return cat ? cat.name : "Unknown";
  };

  // Filter products safely
  const filteredProducts = products.filter((p) => {
    // Search filter: using title
    const productTitle = p.title ? p.title.toString().trim().toLowerCase() : "";
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query || productTitle.includes(query);

    // Category filter
    let matchesCategory = true;
    if (selectedCategory) {
      const productCategoryId = p.category
        ? typeof p.category === "string"
          ? p.category
          : p.category._id
        : null;
      matchesCategory = productCategoryId === selectedCategory;
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/add-product"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by product title..."
          className="border p-2 rounded flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard
              key={p._id}
              product={{ ...p, onDelete: requestDelete }}
              onClick={() => setSelected(p)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-4">
            No products found.
          </p>
        )}
      </div>

      {selected && (
        <ProductModal
          product={{ ...selected, categoryName: getCategoryName(selected.category) }}
          onClose={() => setSelected(null)}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}

export default ProductListPage;
