export const getUserProfile = async (token: string) => {
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("Token non valido o scaduto");
    }
  
    const data = await res.json();
    return data;
  };
  
  export async function getUserPlaylists(token: string) {
    const res = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) {
      throw new Error("Errore nel recupero delle playlist");
    }
  
    return res.json();
  }
  
  export const getPlaylistTracks = async (playlistId: string, token: string) => {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Errore nel recupero tracce playlist');
    return res.json(); 
  };

  export const playPlaylist = async (playlistId: string, token: string) => {
    const res = await fetch('https://api.spotify.com/v1/me/player/play', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        context_uri: `spotify:playlist:${playlistId}`,
      }),
    });
  
    if (!res.ok) {
      throw new Error('Errore durante l\'avvio della riproduzione');
    }
  
    return res.json();
  };
  