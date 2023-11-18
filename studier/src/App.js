import React from "react";
import "./App.css";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { auth, db, logout } from "./services/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin/Signin";
import Navbar from "./components/Navbar/Navbar";
import Matching from "./components/Matching/Matching.js";
import Messages from "./components/Messages/Messages.js";
import ProfileCard from "./components/Matching/ProfileCard/ProfileCard.js";

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="App">
      <Router>
        <div className="navbar-container">
          <div className="navbar">
            <Navbar />
          </div>
        </div>
        <div className="content-container">
          <Routes>
            <Route exact path="/" element={<Signin />} />
            <Route exact path="/match" element={<Matching />} />
            <Route exact path="/messages" element={<Messages />} />
            <Route exact path="/profile" element={<ProfileCard />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
