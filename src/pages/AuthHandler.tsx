import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");

    if (token) {
      navigate("/dashboard"); 
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>🔄 Verifica accesso in corso...</p>;
};

export default AuthHandler;
