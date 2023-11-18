// Navbar.js

import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import your custom styles
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/firebase";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout(); // Call the logout function to sign the user out
    navigate("/");
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Your Logo
        </Link>

        <div className="navbar-links">
          <Link to="/account" className="navbar-link">
            Account
          </Link>
          <Link to="/match" className="navbar-link">
            Match
          </Link>
          <Link to="/messages" className="navbar-link">
            Messages
          </Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
