import React from "react";
import { Outlet } from "react-router-dom";
function FullPageRoute() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default FullPageRoute;
