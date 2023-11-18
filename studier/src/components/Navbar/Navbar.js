// Navbar.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import your custom styles
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/firebase";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout(); // Call the logout function to sign the user out
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <div className="navbar-container">
        <div className={`navbar-header ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" className="navbar-logo">
            Your Logo
          </Link>
          <button className="menu-button" onClick={toggleMenu}>
            Menu
          </button>
          {/* <button className="reopen-button" onClick={openMenu}>
            Reopen Menu
          </button> */}
        </div>

        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/account" className="navbar-link">
            Account
          </Link>
          <Link to="/match" className="navbar-link">
            Match
          </Link>
          <Link to="/messages" className="navbar-link">
            Messages
          </Link>
          <Link onClick={handleSignOut} className="navbar-link">
            Sign Out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
