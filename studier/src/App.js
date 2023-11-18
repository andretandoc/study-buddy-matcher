import React, { useState, useEffect } from "react";
import "./App.css";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { auth, db, logout } from "./services/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Route, Routes, Form } from "react-router-dom";
import SignIn from "./components/SignIn/SignIn";
import LandingPage from "./components/LandingPage/LandingPage";
import ActivityPage from "./components/ActivityPage/ActivityPage";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route exact path="/landingpage" element={<LandingPage />} />
            <Route exact path="/activity" element={<ActivityPage />} />
          </Routes>
          <Navbar />
        </Router>
      </div>
    </div>
  );
};

export default App;
