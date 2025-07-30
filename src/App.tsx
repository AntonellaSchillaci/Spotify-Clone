import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import AuthHandler from './pages/AuthHandler';
import Callback from './pages/Callback';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthHandler />} />
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
};

export default App;
