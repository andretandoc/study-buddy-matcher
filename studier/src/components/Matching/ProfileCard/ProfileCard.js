// ProfileCard.js

import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ userData, isActive, onLike, onDislike }) => {
  return (
    <div
      id={`profileCard_${userData.uid}`}
      className={`ProfileCard ${isActive ? "active" : ""}`}
      style={{ zIndex: isActive ? 1 : 0, height: "auto" }}
    >
      <div className="ProfileCardHeader">
        <h3>{userData.name}</h3>
      </div>
      <div className="ProfileCardBody">
        {/* Add other user attributes as needed */}
      </div>
      <div className="ProfileCardFooter">
        <button className="like" onClick={onLike}>
          Like
        </button>
        <button className="dislike" onClick={onDislike}>
          Dislike
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
