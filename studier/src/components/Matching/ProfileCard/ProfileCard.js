import React from "react";
import "./ProfileCard.css";
import profile_icon from "../assets/icon_image.jpg";

const ProfileCard = () => {
  return (
    <div className="pc">
      <div className="gradient"></div>
      <div className="profile-down"></div>
      <img src={profile_icon} alt="" />
      <div className="profile-title">Placeholder Name</div>
      <div className="profile-description">Placeholder Description</div>
      <div className="profile-button">
        <a href="mailto:placeholderemail@mail.com"> */ Contact Me</a>
      </div>
    </div>
  );
};

export default ProfileCard;
