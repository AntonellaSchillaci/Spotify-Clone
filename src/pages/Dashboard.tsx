import { useEffect, useState } from "react";
import { getUserProfile, getUserPlaylists } from "../services/spotify";
import PlaylistDetails from "../components/PlaylistDetails/PlaylistDetails";

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
  images: SpotifyImage[];
}

const Dashboard = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("spotify_access_token");

  useEffect(() => {
    if (!token) {
      setError("Nessun token trovato");
      return;
    }

    getUserProfile(token)
      .then((data) => setUser(data))
      .catch(() => setError("Errore nel recupero profilo"));

    getUserPlaylists(token)
      .then((data) => setPlaylists(data.items))
      .catch(() => setError("Errore nel recupero playlist"));
  }, [token]);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Caricamento profilo...</div>;

  return (
    <div className="dashboard">
      <h2>Benvenuto, {user.display_name}!</h2>
      <p>Email: {user.email}</p>
      <p>Tipo account: {user.product}</p>
      {user.images?.length > 0 && (
        <img src={user.images[0].url} alt="Profilo" />
      )}

      <h2>Playlist</h2>
      <ul>
        {playlists.map((pl) => (
          <li key={pl.id} onClick={() => setSelectedPlaylistId(pl.id)}>
            {pl.images?.[0]?.url && (
              <img src={pl.images[0].url} alt={pl.name} />
            )}{" "}
            {pl.name}
          </li>
        ))}
      </ul>

      {selectedPlaylistId && token && (
        <PlaylistDetails playlistId={selectedPlaylistId} token={token} />
      )}
    </div>
  );
};

export default Dashboard;
