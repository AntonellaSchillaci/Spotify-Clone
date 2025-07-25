import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import AuthHandler from './pages/AuthHandler';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthHandler />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
