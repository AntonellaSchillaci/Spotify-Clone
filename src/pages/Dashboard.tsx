import { useEffect, useState } from "react";
import { getUserProfile, getUserPlaylists } from "../services/spotify";
import PlaylistDetails from "../components/PlaylistDetails/PlaylistDetails";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

import "./Dashboard.scss";

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
  owner: {
    display_name: string;
  };
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
    <>
      {user && <Navbar user={user} />}
      <div className="dashboard">
        <Sidebar playlists={playlists} onSelect={setSelectedPlaylistId} />
        <main className="main-content">
          {selectedPlaylistId && token && (
            <PlaylistDetails playlistId={selectedPlaylistId} token={token} />
          )}
        </main>
      </div>
    </>
  );
};

export default Dashboard;
