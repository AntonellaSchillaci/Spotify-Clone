import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const AuthHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get('access_token');
      if (token) {
        dispatch(setToken(token));
        window.history.replaceState(null, '', '/'); 
        navigate('/home');
      }
    }
  }, [dispatch, navigate]);
  

  return (
    <div>
      <h2>Benvenuto in Spotify Clone!</h2>
      <p>Sei autenticato ✅</p>
    </div>
  );
};

export default AuthHandler;
