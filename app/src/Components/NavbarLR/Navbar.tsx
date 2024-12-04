import React from "react";
import "./Navbar.css";
 
const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <a href="/homepage" className="navbar-logo">Prepwise</a>
      <div className="navbar-links">
        <a href="/dashboard">Dashboard</a>
        <a href="/flashcards">General Words for GRE and GMAT</a>
      </div>
      <div className="navbar-signout">
        <a href="/profile">Profile</a>
        <a href="/premium" className="navbar-premium">
          Go Premium
        </a>
        <a href="/login">Login</a>
        <a href="/logout">Log out</a>
      </div>
    </div>
  );
};

export default Navbar;