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
import Accounts from "./components/Accounts/Accounts.js";
import ChatPage from "./components/Messages/ChatPage.js";

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    // You might want to show a loading spinner or some indication that the app is loading
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle error state, e.g., show an error message
    return <div>Error: {error}</div>;
  }

  // If user is not authenticated, redirect to the sign-in page
  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/*" element={<Signin />} />
        </Routes>
      </Router>
    );
  }

  // If the user is authenticated, render the app
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
            <Route
              exact
              path="/messages"
              element={<ChatPage currentUserUid={user.uid} />}
            />
            <Route exact path="/profile" element={<ProfileCard />} />
            <Route exact path="/accounts" element={<Accounts />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
