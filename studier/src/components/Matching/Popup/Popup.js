// MatchPopup.js
import React, { useEffect, useState } from "react";
import "./Popup.css";

const MatchPopup = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Adjust the timeout based on how long you want the popup to be visible

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={`MatchPopup ${isVisible ? "" : "hide"}`}>
      <h2>🎉 It's a Match! 🎉</h2>
      <p>Lets get this bread!</p>
      <button onClick={() => onClose()}>Close</button>
    </div>
  );
};

export default MatchPopup;
