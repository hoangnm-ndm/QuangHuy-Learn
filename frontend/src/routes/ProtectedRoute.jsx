import React from "react";
import { Outlet } from "react-router";

const user = {
  name: "Hoang",
  role: "member",
};

const ProtectedRoute = ({ roles }) => {
  const checkRole = roles.includes(user.role);

  if (checkRole) return <Outlet />;
  return (
    <div>
      <h1>Ban khong co quyen</h1>
    </div>
  );
};

export default ProtectedRoute;
