import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";

function Matching() {
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        // Redirect to the root path if there's no signed-in user
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //   if (user) {
  //     // Redirect to the landing page if user is authenticated
  //     return navigate("/landingpage");
  //   }

  return (
    <div className="Matching">
      <h1>Matching</h1>
    </div>
  );
}

export default Matching;
