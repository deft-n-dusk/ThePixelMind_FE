import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axiosInstance";

function EditCategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await api.get(`/category/${id}`);
        const { name, description } = res.data.category; // only allowed fields
        setForm({ name, description });
      } catch (err) {
        console.error("Error fetching category:", err);
        setError("Failed to load category");
      }
    };
    fetchCategory();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!form.name.trim()) {
      setError("Name cannot be empty");
      return;
    }

    try {
      await api.patch(`/category/update/${id}`, form);
      setMessage("Category updated successfully!");
      setError(""); // clear previous error
      setTimeout(() => navigate("/categories"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating category");
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      {message && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-2">{message}</div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-2">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditCategoryPage;
