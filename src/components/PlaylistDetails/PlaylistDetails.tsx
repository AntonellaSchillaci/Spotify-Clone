import { useEffect, useState } from 'react';
import { getPlaylistTracks } from '../../services/spotify';

interface Track {
  id: string;
  name: string;
  preview_url: string | null;
  artists: { name: string }[];
}

interface PlaylistDetailsProps {
  playlistId: string;
  token: string;
}

interface PlaylistTrackItem {
    track: Track;
  }
  

const PlaylistDetails = ({ playlistId, token }: PlaylistDetailsProps) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPlaylistTracks(playlistId, token)
      .then(data => {
        const fetchedTracks = data.items.map((item: PlaylistTrackItem) => item.track);
        setTracks(fetchedTracks);
      })
      .catch(() => setError('Errore nel caricamento tracce'));
  }, [playlistId, token]);

  if (error) return <p>{error}</p>;
  if (tracks.length === 0) return <p>Playlist vuota</p>;

  return (
    <div>
      <h3>Brani</h3>
      <ul>
        {tracks.map(track => (
          <li key={track.id}>
            {track.name} — {track.artists.map(a => a.name).join(', ')}
            {track.preview_url && (
              <audio controls src={track.preview_url}  />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistDetails;
