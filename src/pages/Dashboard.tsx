import { useEffect, useState } from "react";
import { getUserProfile, getUserPlaylists } from "../services/spotify";

interface SpotifyImage {
  url: string;
  height?: number;
  width?: number;
}

interface UserProfile {
  display_name: string;
  email: string;
  product: string;
  images?: SpotifyImage[];
}

interface Playlist {
  id: string;
  name: string;
  images: SpotifyImage[];
  tracks: {
    total: number;
  };
}

const Dashboard = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
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

    getUserPlaylists(token)
      .then((data) => {
        setPlaylists(data.items);
      })
      .catch((err) => {
        console.error(err);
        setError("Errore nel recupero delle playlist");
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Caricamento profilo...</div>;

  return (
    <div className="dashboard">
      <h2>Benvenuto, {user.display_name}!</h2>
      <p>Email: {user.email}</p>
      <p>Tipo account: {user.product}</p>
      {user.images && user.images.length > 0 && (
        <img src={user.images[0].url} alt="Profilo" width={100} />
      )}

      <h3>🎵 Le tue Playlist</h3>
      <div className="playlists" >
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist" >
            {playlist.images[0] && (
              <img src={playlist.images[0].url} alt={playlist.name} />
            )}
            <p><strong>{playlist.name}</strong></p>
            <p>{playlist.tracks.total} brani</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
