import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar'; // Import Navbar component
import { useEffect, useState } from 'react';
import { tokenService } from './services/tokenService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = tokenService.getAccessToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSignOut = () => {
    tokenService.removeAccessToken();
    tokenService.removeRefreshToken();
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return (
    <>
      {/* Add Navbar */}
      <Navbar isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
