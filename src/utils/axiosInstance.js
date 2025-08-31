import axios from "axios";

const api = axios.create({
  baseURL: "https://thepixelmind-be.onrender.com",
  withCredentials: true, // ✅ allow cookies to be sent
});

export default api;
