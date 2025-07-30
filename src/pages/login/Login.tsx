import { useEffect, useState } from 'react';
import { generateCodeChallenge, generateCodeVerifier } from '../../utils/pkce';

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
  const [loginUrl, setLoginUrl] = useState('');

  useEffect(() => {
    const setupLogin = async () => {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      localStorage.setItem('pkce_code_verifier', codeVerifier);

      const url = new URL('https://accounts.spotify.com/authorize');
      url.searchParams.set('client_id', clientId);
      url.searchParams.set('response_type', 'code');
      url.searchParams.set('redirect_uri', redirectUri);
      url.searchParams.set('scope', scopes.join(' '));
      url.searchParams.set('code_challenge_method', 'S256');
      url.searchParams.set('code_challenge', codeChallenge);

      console.log("Login URL:", url.toString());

      setLoginUrl(url.toString());
    };

    setupLogin();
  }, []);

  return (
    <div className="login">
      <h1>🎵 Spotify Clone</h1>
      {loginUrl ? (
        <a href={loginUrl}>Login con Spotify</a>
      ) : (
        <p>Generazione login URL...</p>
      )}
    </div>
  );
};

export default Login;
