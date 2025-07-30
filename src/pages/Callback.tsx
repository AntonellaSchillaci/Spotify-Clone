import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      console.error("Missing authorization code");
      navigate("/login");
      return;
    }

    const codeVerifier = localStorage.getItem("pkce_code_verifier");
    if (!codeVerifier) {
      console.error("Missing code verifier");
      navigate("/login");
      return;
    }

    const body = new URLSearchParams();
    body.append("grant_type", "authorization_code");
    body.append("code", code);
    body.append("redirect_uri", import.meta.env.VITE_REDIRECT_URI);
    body.append("client_id", import.meta.env.VITE_SPOTIFY_CLIENT_ID);
    body.append("code_verifier", codeVerifier);

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Token exchange failed");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Token response:", data);
        localStorage.setItem("spotify_access_token", data.access_token);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Token exchange error:", err);
        navigate("/login");
      });
  }, [navigate]);

  return <p>🔄 Reindirizzamento in corso...</p>;
};

export default Callback;
