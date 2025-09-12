import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToken } from "../customHooks/TokenProvider";
import { useId } from "../customHooks/IdProvider";

function OAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken } = useToken();
  const { setId } = useId();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const id = params.get("id");

    if (token && id) {
      console.log("0authSUCCES CALLED");
      console.log("" + token + id);
      setToken(token);
      setId(id);
      navigate("/dashboard");
    } else {
      console.log("navigate to error");

      navigate("/error");
    }
  }, [location, navigate, setToken, setId]);

  return null;
}

export default OAuthSuccess;
