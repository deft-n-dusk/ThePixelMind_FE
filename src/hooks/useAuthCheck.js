// src/hooks/useAuthCheck.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../utils/axiosInstance";
import { setUser, logout, setAuthChecked } from "../redux/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/check", { withCredentials: true });
        // Backend returns { authenticated: true, user: {...} }
        if (res.data.authenticated) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        dispatch(logout());
      } finally {
        dispatch(setAuthChecked());
      }
    };

    checkAuth();
  }, [dispatch]);
}
