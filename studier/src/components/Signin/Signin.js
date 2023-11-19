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
import Logo from "../Navbar/Logo";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const [user, setUser] = useState(null); // To store the authenticated user
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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
    registerWithEmailAndPassword(email, password);
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
      <Logo className="logo" />
      <h2>{isSignIn ? "Sign In" : "Sign Up"}</h2>
      <form>
        {/* {!isSignIn && (
          <div>
            <label>Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        )} */}
        <div>
          {/* <label>Email</label> */}
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isSignIn ? (
          <>
            <button
              type="button"
              className="signin"
              onClick={handleSignInWithEmailAndPassword}
            >
              Sign In
            </button>
            <button
              type="button"
              className="google"
              onClick={handleSignInWithGoogle}
            >
              Sign In with Google
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

        <button type="button" onClick={() => setShowForgotPassword(true)}>
          Forgot Password?
        </button>

        {showForgotPassword && (
          <div className="ForgotPasswordPopup">
            <h2>Forgot Password</h2>
            <p>Enter your email to reset your password</p>
            <input
              type="email"
              value={email}
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button type="button" onClick={handlePasswordReset}>
              Reset Password
            </button>
            <button type="button" onClick={() => setShowForgotPassword(false)}>
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Signin;
