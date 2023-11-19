// ProfileCard.js

import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ userData, isActive, onLike, onDislike }) => {
  const {
    name = "",
    pastCourses = [],
    yearsOfStudy = "",
    description = "",
    currentCourses = [],
    major = "",
    uid = "",
    image = "",
  } = userData;
  console.log(userData);
  return (
    <div
      id={`profileCard_${uid}`}
      className={`ProfileCard ${isActive ? "active" : ""}`}
    >
      <div className="ProfileCardHeaderr">
        <h2>{name}</h2>
      </div>
      <div className="ProfileCardBodyy">
        {image && (
          <div className="ProfileCardImage">
            <img src={`data:image/png;base64, ${image}`} alt="User" />
          </div>
        )}
        <div className="ProfileCardInfo">
          <p>
            <strong>Year:</strong> U{yearsOfStudy}
          </p>
          <p>
            <strong>Major:</strong> {major}
          </p>
        </div>
        <div style={{ margin: "0px" }}>
          <p>
            <strong>Past Courses:</strong> {pastCourses.join(", ")}
          </p>
          <p>
            <strong>Current Courses:</strong> {currentCourses.join(", ")}
          </p>
        </div>
        <div className="ProfileCardDescriptionn">
          <p>{description}</p>
        </div>
      </div>
      <div className="ProfileCardFooter">
        <button className="like" onClick={onLike}>
          Interested!
        </button>
        <button className="dislike" onClick={onDislike}>
          Another time...
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
