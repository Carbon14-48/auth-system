import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../customHooks/TokenProvider";
function Dashboard() {
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token, navigate]);
  if (!token) return null;
  return <div>Welcome to your dashboard</div>;
}

export default Dashboard;
