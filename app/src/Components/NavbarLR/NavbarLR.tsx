import React, {useState} from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./NavbarLR.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("authToken") // Check if user is logged in
  );

  // Handle dropdown selection
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(selectedValue); // Navigate to the selected route
    }
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
      <div className="navbar-links">
        <a href="/dashboard">Dashboard</a>
        <a href="/flashcards">General Words for GRE and GMAT</a>
      </div>
      <div className="navbar-signout">
        <a href="/profile">Profile</a>
        <select id="practice-dropdown" name="dropdown" onChange={handleDropdownChange} className="practice-dropdown">
          <option value="/flashcards-option" className="select-option" disabled selected>Flash Card</option>
          <option value="/flashcards-verbal" className="select-flashcard">Verbal</option>
          <option value="/flashcards-quant" className="select-flashcard">Quant</option>
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