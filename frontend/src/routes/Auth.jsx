import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
function Auth() {
  return (
    <div className="flex flex-col gap-8 ">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Auth;
