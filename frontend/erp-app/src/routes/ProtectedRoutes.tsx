import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {

  const userRole = localStorage.getItem("userRole");
  if (!userRole || !allowedRoles.includes(userRole || "")) {
    return <Navigate to="/unauthorized" />;
  }
  return element;
};

export default ProtectedRoute;  