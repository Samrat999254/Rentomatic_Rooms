import React from "react";
import { Navigate } from "react-router-dom";
import { hasToken, getSession } from "../helper/session";

export const AdminRoute = ({ children }) => {
  const admin = getSession();
  console.log(admin);
  const isAuthenticated = hasToken();

  if (isAuthenticated && JSON.parse(admin).role === "admin") {
    return children;
  }

  return <Navigate to="/" />;
};

export default AdminRoute;
