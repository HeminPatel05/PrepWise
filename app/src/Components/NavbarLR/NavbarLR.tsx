import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./NavbarLR.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handle dropdown selection
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(selectedValue); // Navigate to the selected route
    }
  };

  return (
    <div className="navbar">
      <a href="/homepage" className="navbar-logo">Prepwise</a>
      <div className="navbar-links">
        <a href="/dashboard">Dashboard</a>
        <a href="/flashcards">General Words for GRE and GMAT</a>
      </div>
      <div className="navbar-signout">
        <a href="/profile">Profile</a>
        <select id="practice-dropdown" name="dropdown" onChange={handleDropdownChange} className="practice-dropdown">
          <option value="" className="select-flashcard">Flash Cards</option>
          <option value="" className="select-flashcard">Verbal</option>
          <option value="" className="select-flashcard">Quant</option>
        </select>
        <a href="/premium" className="navbar-premium">Go Premium</a>
        <a href="/login">Login</a>
        <a href="/logout">Log out</a>
      </div>
    </div>
  );
};

export default Navbar;