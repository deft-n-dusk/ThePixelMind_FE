import { useState, useEffect } from "react";
import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function AddProductPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "", // backend expects categoryId
    imageURL: "",
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/category/all");
        if (res.data.success && Array.isArray(res.data.categories)) {
          setCategories(res.data.categories);
        } else {
          console.error("No categories returned from API");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage(null);
  setError(null);

  try {
    const payload = {
      title: form.title.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      categoryId: form.categoryId,
      imageURL: form.imageURL.trim(),
    };

    console.log("Submitting product:", payload); // check payload

    await api.post("/product/add", payload);
    setMessage("✅ Product added successfully! Redirecting...");
    setTimeout(() => navigate("/products"), 3000);
  } catch (err) {
    const msg =
      err.response?.data?.message || err.message || "❌ Failed to add product.";
    setError(msg);
    console.error("Add product error:", err);
  }
};


  return (
    <div className="max-w-md mx-auto mt-6">
      <h1 className="text-xl font-bold mb-4">Add Product</h1>

      {message && (
        <div className="mb-3 p-2 text-green-700 bg-green-100 rounded">{message}</div>
      )}
      {error && (
        <div className="mb-3 p-2 text-red-700 bg-red-100 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="imageURL"
          placeholder="Image URL"
          value={form.imageURL}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
