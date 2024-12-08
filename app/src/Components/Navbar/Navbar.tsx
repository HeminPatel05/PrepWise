import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">Prepwise</div>
      <div className="navbar-links">
        <a href="/dashboard">Dashboard</a>
        <Link to="/flashcards-verbal">Practice</Link> 
      </div>
      <div className="navbar-signout">
        <a href="/profile">Profile</a>
        <a href="/logout">Log out</a>
      </div>
    </div>
  );
};

export default Navbar;
