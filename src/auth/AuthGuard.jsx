// auth/AuthGuard.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function AuthGuard() {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated, "authentication");

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}
