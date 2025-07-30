const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;
const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'user-library-read',
  'streaming'
];

const Login = () => {
  console.log("Client ID:", clientId);
  console.log("Redirect URI:", redirectUri);

    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&scope=${encodeURIComponent(scopes.join(' '))}`;
      
    console.log("login URL:", loginUrl);
  return (
    <div className="login">
      <h1>🎵 Spotify Clone</h1>
      <a href={loginUrl}>Login con Spotify</a>
    </div>
  );
};

export default Login;
