import React, { useState, useEffect } from "react";
import { fetchUserDetails } from "../../services/firebase";
import "./ProfileCardMessaging.css";

const ProfileCardMessaging = ({ selected }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const info = await fetchUserDetails(selected);
      setUserData(info);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [selected]);

  return (
    <div id={`profileCard_${userData?.uid}`} className={`ProfileCardMessaging`}>
      {userData ? (
        <>
          <div className="ProfileCardHeader">
            <h3>{userData.name}</h3>
          </div>
          <div className="ProfileCardBody">
            <div className="ProfileCardInfo">
              <p>
                <strong>U{userData.yearsOfStudy}</strong>
              </p>
              <p>
                <strong>Major:</strong> {userData.major}
              </p>
            </div>
            <div className="ProfileCardCourses">
              <p>
                <strong>Past Courses:</strong>{" "}
                {userData?.pastCourses.join(", ")}
              </p>
              <p>
                <strong>Current Courses:</strong>{" "}
                {userData?.currentCourses.join(", ")}
              </p>
            </div>
            <div className="ProfileCardDescription">
              <p>{userData.description}</p>
            </div>
            {userData.image && (
              <div className="ProfileCardImage">
                <img
                  src={`data:image/png;base64, ${userData.image}`}
                  alt="User"
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ProfileCardMessaging;
