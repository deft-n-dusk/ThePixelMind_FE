import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user, authChecked } = useSelector((state) => state.auth);

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Checking authentication...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}