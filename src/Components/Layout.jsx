// src/Components/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="p-6 min-h-screen bg-gray-100">
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
