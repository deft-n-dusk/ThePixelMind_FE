import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";


function AddCategoryPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/category/add", form);
      setMessage("Category added successfully!");
      setTimeout(() => navigate("/categories"), 3000);
    } catch (err) {
      setError(err.response?.data || "Error adding category");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Add Category</h1>
      {message && <div className="bg-green-100 text-green-700 p-2 rounded">{message}</div>}
      {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
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
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddCategoryPage;
