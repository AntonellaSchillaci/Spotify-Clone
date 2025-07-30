import { useEffect, useState } from "react";
import { getUserProfile } from "../services/spotify";

interface SpotifyImage {
    url: string;
    height?: number;
    width?: number;
  }
  
  interface UserProfile {
    display_name: string;
    email: string;
    product: string;
    images: SpotifyImage[];
  }
  
const Dashboard = () => {
    const [user, setUser] = useState<UserProfile | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (!token) {
      setError("Nessun token trovato");
      return;
    }

    getUserProfile(token)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Errore nel recupero profilo");
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Caricamento profilo...</div>;

  return (
    <div className="dashboard">
      <h2>Benvenuto, {user.display_name}!</h2>
      <p>Email: {user.email}</p>
      <p>Tipo account: {user.product}</p>
      {user.images?.length > 0 && (
        <img
          src={user.images[0].url}
          alt="Profilo"
        />
      )}
    </div>
  );
};

export default Dashboard;
