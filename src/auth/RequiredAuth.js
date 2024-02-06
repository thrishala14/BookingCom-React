import React from "react";
import useAuth from "./useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

const RequiredAuth = ({ allowedRoles }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const label = window.appLabels.toastErrors;

  return currentUser?.customerId ? (
    allowedRoles.find((role) => currentUser.role.includes(role)) ? (
      <Outlet />
    ) : (
      toast.error(label.adminError)
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequiredAuth;
