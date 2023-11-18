import React, { useState, useEffect } from "react";
import "./App.css";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { auth, db, logout } from "./services/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { BrowserRouter as Router, Route, Routes, Form } from "react-router-dom";
import Signin from "./components/Signin/Signin";
// import Navbar from "./components/Navbar/Navbar";
import Matching from "./components/Matching/Matching.js";
import Messages from "./components/Messages/Messages.js";

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Signin />} />
            <Route exact path="/match" element={<Matching />} />
            <Route exact path="/messages" element={<Messages />} />
          </Routes>
          {/* <Navbar /> */}
        </Router>
      </div>
    </div>
  );
};

export default App;
