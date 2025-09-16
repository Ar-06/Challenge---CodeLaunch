import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

export const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
