// App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";
import useAuthCheck from "./hooks/useAuthCheck";

import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ProductListPage from "./Components/ProductListPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import CategoryListPage from "./Components/CategoryListPage";
import AddCategoryPage from "./pages/AddCategoryPage";
import EditCategoryPage from "./pages/EditCategoryPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  useAuthCheck(); // check auth on every page load

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

      {/* Private Routes */}
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Home />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="add-product" element={<AddProductPage />} />
        <Route path="edit-product/:id" element={<EditProductPage />} />
        <Route path="categories" element={<CategoryListPage />} />
        <Route path="add-category" element={<AddCategoryPage />} />
        <Route path="edit-category/:id" element={<EditCategoryPage />} />
      </Route>
    </Routes>
  );
}

export default App;
