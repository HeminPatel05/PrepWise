import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useTranslation } from "react-i18next"; // Import useTranslation for language switching
import "./NavbarLR.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const { i18n } = useTranslation(); // Hook for translation
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("authToken") // Check if user is logged in
  );

  // Handle dropdown selection for practice
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(selectedValue); // Navigate to the selected route
    }
  };

  // Handle language change
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage); // Change the language using i18n
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    setIsAuthenticated(false); // Update authentication state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="navbar">
      <a href="/homepage" className="navbar-logo">Prepwise</a>
      <div className="navbar-signout">
        <a href="/profile">Profile</a>
        <select id="practice-dropdown" name="dropdown" onChange={handleDropdownChange} className="practice-dropdown">
          <option value="" disabled selected>Flash Card</option>
          <option value="/flashcards-verbal">Verbal</option>
          <option value="/flashcards-quant">Quant</option>
        </select>
        <select
          id="language-dropdown"
          name="language"
          onChange={handleLanguageChange}
          className="language-dropdown"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="de">Deut</option>
          {/* Add more languages here */}
        </select>
        <a href="/premium" className="navbar-premium">Go Premium</a>
        {/* Conditionally render Login or Logout */}
        {!isAuthenticated ? (
          <a href="/login">Login</a>
        ) : (
          <a onClick={handleLogout} style={{ cursor: "pointer" }}>Log out</a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
