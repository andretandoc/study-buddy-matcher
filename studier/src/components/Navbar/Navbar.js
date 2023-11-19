// Navbar.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import your custom styles
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/firebase";
import { useLocation } from "react-router-dom";
import bird from "./mcgill.png";
import lamp from "./lamp.svg";
import Logo from "./Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Change the initial state to false
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    logout(); // Call the logout function to sign the user out
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if the current route is the sign-in screen
  const isSignInScreen =
    location.pathname === "/signin" || location.pathname === "/";

  // Conditionally render the navbar based on the route
  if (isSignInScreen) {
    return <div className="test"></div>; // Don't render the navbar on the sign-in screen
  }

  return (
    <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <div className="navbar-container">
        <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" className="navbar-logo">
            <Logo />
          </Link>
          <Link to="/match" className="navbar-link">
            Match
          </Link>{" "}
          <Link to="/messages" className="navbar-link">
            Messages
          </Link>
          <Link to="/accounts" className="navbar-link">
            Profile
          </Link>
        </div>

        <div
          style={{
            width: "100%",
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div className={`navbar-links signout`}>
            <Link onClick={handleSignOut} className="navbar-link-signout">
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
