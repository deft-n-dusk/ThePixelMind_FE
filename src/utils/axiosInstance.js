import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2713",
  withCredentials: true, // ✅ allow cookies to be sent
});

export default api;
