// ProfileCard.js

import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ userData, isActive, onLike, onDislike }) => {
  const {
    name,
    pastCourses,
    yearOfStudy,
    description,
    currentCourses,
    major,
    uid,
    image,
  } = userData;

  return (
    <div
      id={`profileCard_${uid}`}
      className={`ProfileCard ${isActive ? "active" : ""}`}
    >
      <div className="ProfileCardHeader">
        <h3>{name}</h3>
      </div>
      <div className="ProfileCardBody">
        <div className="ProfileCardInfo">
          <p>
            <strong>Year of Study:</strong> {yearOfStudy}
          </p>
          <p>
            <strong>Major:</strong> {major}
          </p>
        </div>
        <div className="ProfileCardCourses">
          <p>
            <strong>Past Courses:</strong> {pastCourses.join(", ")}
          </p>
          <p>
            <strong>Current Courses:</strong> {currentCourses.join(", ")}
          </p>
        </div>
        <div className="ProfileCardDescription">
          <p>
            <strong>Description:</strong> {description}
          </p>
        </div>
        {image && (
          <div className="ProfileCardImage">
            <img src={`data:image/png;base64, ${image}`} alt="User" />
          </div>
        )}
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
