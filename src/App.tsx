import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar'; // Import Navbar component
import { useEffect, useState } from 'react';
import { tokenService } from './services/tokenService';
import RequestPassword from './pages/RequestPassword.tsx';
import ResetPassword from './pages/ResetPassword.tsx';

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
      {/* Navbar will always be visible */}
      <Navbar isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />

      {/* Define Routes */}
      <Routes>
        {isAuthenticated ? (
          // Authenticated Routes
          <>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          // Not Authenticated Routes
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/reset-password" element={<RequestPassword />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            />{' '}
            {/* Token route */}
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
