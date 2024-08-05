// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './style/NavBar.css'; // Assurez-vous d'ajouter le fichier CSS

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        
        <li className="nav-item">
          <Link to="/users/new">Ajouter Qr code</Link>
        </li>
        <li className="nav-item">
          <Link to="/">Liste des Qr code</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
