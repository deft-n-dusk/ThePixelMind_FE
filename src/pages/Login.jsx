import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axiosInstance";

export default function Login() {
  const [form, setForm] = useState({ emailId: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form, { withCredentials: true });
      dispatch(setUser(res.data.user));
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center items-start pt-48 bg-gray-100 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-lg rounded-xl w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <input
          name="emailId"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white w-full p-3 rounded transition">
          Login
        </button>

        <p className="text-center text-gray-600 mt-2 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
