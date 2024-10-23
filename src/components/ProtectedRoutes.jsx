import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { user } = useAuthContext();

  console.log(user);

  return user ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoutes;
