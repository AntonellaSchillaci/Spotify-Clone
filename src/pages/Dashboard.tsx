import { useEffect, useState } from "react";
import { getUserProfile, getUserPlaylists, playPlaylist } from "../services/spotify";
import PlaylistDetails from "../components/PlaylistDetails/PlaylistDetails";

import "./Dashboard.scss";
import Navbar from "../components/Navbar/Navbar";

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
      <h2>Playlist</h2>
      <div className="playlists">
        {playlists.map((pl) => (
          <div
            key={pl.id}
            className="playlist-card"
            onClick={() => setSelectedPlaylistId(pl.id)}
          >
            <div className="cover">
              {pl.images?.[0]?.url && (
                <img src={pl.images[0].url} alt={pl.name} />
              )}
            </div>
            <div className="playlist-info">
              <div className="title">{pl.name}</div>
              <div className="owner">{pl.owner.display_name}</div>
            </div>
            <button
              className="play-button"
              onClick={(e) => {
                e.stopPropagation();
                if (token) {
                  playPlaylist(pl.id, token);
                } else {
                  console.error("Token non disponibile");
                }
              } }
              aria-label={`Play playlist ${pl.name}`}
            >
              <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <polygon points="5,3 19,12 5,21"></polygon>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {selectedPlaylistId && token && (
        <PlaylistDetails playlistId={selectedPlaylistId} token={token} />
      )}
    </div></>
  );
}

export default Dashboard;
