import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    console.log("URL hash:", hash); 

    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    console.log("Access Token:", accessToken); 

    if (accessToken) {
      localStorage.setItem("spotify_access_token", accessToken);
      navigate("/dashboard"); 
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>🔄 Reindirizzamento in corso...</p>;
};

export default Callback;
