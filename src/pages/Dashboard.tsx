import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

interface Playlist {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
}

const Dashboard = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("spotify_access_token");

  useEffect(() => {
    if (!token) {
      setError("🔒 Nessun token trovato. Effettua il login.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const profileData = await getUserProfile(token);
        setUser(profileData);

        const res = await fetch("https://api.spotify.com/v1/me/playlists", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setPlaylists(data.items || []);
      } catch (err) {
        console.error(err);
        setError("❌ Errore nel recupero dei dati");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("spotify_access_token");
    navigate("/login");
  };

  if (loading) return <div>⏳ Caricamento...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      <button onClick={handleLogout}>🚪 Logout</button>
      <h2>Benvenuto, {user?.display_name}!</h2>
      <p>Email: {user?.email}</p>
      <p>Tipo account: {user?.product}</p>
      {user && Array.isArray(user.images) && user.images.length > 0 && (
      <img
        src={user.images[0].url}
        alt="Profilo"
      />
    )}


      <h3>🎵 Le tue playlist</h3>
      {playlists.length > 0 ? (
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <a href={playlist.external_urls.spotify} target="_blank" rel="noreferrer">
                {playlist.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Non hai ancora playlist salvate.</p>
      )}
    </div>
  );
};

export default Dashboard;
