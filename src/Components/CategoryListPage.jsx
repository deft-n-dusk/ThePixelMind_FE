import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axiosInstance";

function CategoryListPage() {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category/all");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/category/delete/${id}`);
      setCategories(categories.filter((c) => c._id !== id));
      setMessage("Category deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link
          to="/add-category"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Category
        </Link>
      </div>

      {message && <div className="bg-green-100 text-green-700 p-2 rounded">{message}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((c) => (
          <div
            key={c._id}
            className="border rounded shadow p-3 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{c.name}</h2>
              <p className="text-gray-600">{c.description}</p>
            </div>
            <div className="flex gap-3">
              <Link
                to={`/edit-category/${c._id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(c._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryListPage;
