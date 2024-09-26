import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Consultation from './pages/Consultation'; // Exemple de page consultation
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    // Initialiser l'état en vérifiant localStorage
    const storedLoggedIn = localStorage.getItem('loggedIn');
    return storedLoggedIn === 'true'; // Convertir la chaîne en booléen
  });
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        {loggedIn ? <Route path="/consultation" element={<Consultation />}/> : <Route path="/consultation" element={<ErrorPage />}/>}
      </Routes>
    </Router>
  );
};

export default App;
