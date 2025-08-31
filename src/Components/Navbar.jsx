import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import api from "../utils/axiosInstance"; // Make sure your axios instance is set up

function Navbar() {
  const cart = useSelector((state) => state.cart.items || []);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call backend logout API
      await api.post("/logout");

      // Clear Redux state
      dispatch(logout());

      // Navigate to login page
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-gray-300 font-semibold">Home</Link>
        <Link to="/products" className="hover:underline">Products</Link>
        <Link to="/categories" className="hover:underline">Categories</Link>
      </div>

      <div className="flex space-x-4 items-center">
        <Link to="/cart" className="hover:text-gray-300 font-semibold">
          Cart ({cart.length})
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
