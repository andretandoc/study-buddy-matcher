import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  auth,
} from "../../services/firebase";
import "./Signin.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [user, setUser] = useState(null); // To store the authenticated user
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");


  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        navigate("/match");
      } else {
        // Redirect to the root path if there's no signed-in user
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignInWithGoogle = () => {
    signInWithGoogle();
  };

  const handleSignInWithEmailAndPassword = () => {
    logInWithEmailAndPassword(email, password);
  };

  const handleSignUpWithEmailAndPassword = () => {
    registerWithEmailAndPassword(displayName, email, password);
  };

  const handlePasswordReset = () => {
    sendPasswordReset(email);
  };

  //   if (user) {
  //     // Redirect to the landing page if user is authenticated
  //     return navigate("/landingpage");
  //   }

  return (
    <div className="SigninContainer">
      <h2>{isSignIn ? "Sign In" : "Sign Up"}</h2>
      <form>
        {!isSignIn && (
          <div>
            <label>Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        )}
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isSignIn ? (
          <>
            <button type="button" onClick={handleSignInWithGoogle}>
              Sign In with Google
            </button>
            <button type="button" onClick={handleSignInWithEmailAndPassword}>
              Sign In
            </button>
            <p>
              Don't have an account?{" "}
              <span onClick={() => setIsSignIn(false)}>Sign Up</span>
            </p>
          </>
        ) : (
          <>
            <button type="button" onClick={handleSignUpWithEmailAndPassword}>
              Sign Up
            </button>
            <p>
              Already have an account?{" "}
              <span onClick={() => setIsSignIn(true)}>Sign In</span>
            </p>
          </>
        )}
        <button type="button" onClick={handlePasswordReset}>
          Forgot Password?
        </button>
      </form>
    </div>
  );
}

export default Signin;
