import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    return storedLoggedIn === 'true'; // Convertir la chaîne en booléen
  });

  const [role, setRole] = useState<string>(() => {
    const role = localStorage.getItem('role');
    return role!; // Convertir la chaîne en booléen
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Mettre à jour le localStorage à chaque changement de l'état loggedIn
    localStorage.setItem('loggedIn', String(loggedIn));
  }, [loggedIn]);

  useEffect(() => {
    // Mettre à jour le localStorage à chaque changement de l'état loggedIn
    localStorage.setItem('role', role);
  }, [role]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/users/auth/login', { email, password });
      if (response.data.message === 'Login successful') {
        setEmail('');
        setPassword('');
        setLoggedIn(true);
        setRole(response.data.role);
        setError('');
        navigate('/consultation');  // Redirige vers /consultation après connexion
      } else {
        setError(response.data.message);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setError('Invalid credentials, please try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('role');
    localStorage.removeItem('loggedIn');
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between' }}>
      <img 
        src="https://cdn.prod.website-files.com/6368ef8eb234626d58627d89/63690404288ce532d5bc22bf_updocLogo-min.png" 
        alt="logo" 
        width="150" 
      />
      {!loggedIn ? (
        <div>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {err ? <span style={{ color: 'red' }}>{err}</span> : null}
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
    </header>
  );
};

export default Header;
