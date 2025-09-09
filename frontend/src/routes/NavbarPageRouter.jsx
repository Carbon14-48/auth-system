import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
function NavbarPage() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default NavbarPage;
