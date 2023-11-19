// ChatPage.js
import React, { useState, useEffect } from "react";
import Messages from "./Messages";
import Sidebar from "./Sidebar/Sidebar";
import ProfileCard from "./ProfileCard";
import ProfileCardsContainer from "../Matching/Matching";
import { fetchUserDetails } from "../../services/firebase";
import "./ChatPage.css"; // Import a new CSS file for styling

const ChatPage = ({ currentUserUid }) => {
  const [selectedChatUid, setSelectedChatUid] = useState(null);
  const [selectedUserData, selectedSetUserData] = useState("");

  const handleChatSelect = (chatId, otherUserUid) => {
    setSelectedChatUid(chatId);
    console.log("chat id and selectedChatId in ChatPage is: ");
    console.log(chatId);
    console.log(selectedChatUid);
    {console.log(currentUserUid)}
    {console.log(`hi_${selectedChatUid}`)}
  };

  const handleSelectedSetUserData = async () => {
    try {
      const info = await fetchUserDetails(selectedChatUid);
      selectedSetUserData(info);
    } catch (error) {
      console.error("Error fetching user data in chatPage:", error);
    }
  };
  return (
    <div className="chat-page-container">
      <Sidebar
        currentUserUid={currentUserUid}
        onChatSelect={handleChatSelect}
        
      />
      
      {selectedChatUid && (
        <>
        <Messages
          currentUserUid={currentUserUid}
          matchUid={selectedChatUid}
          
        />
        
        <div className="profile true">
          {handleSelectedSetUserData()}
          <div className="ProfileCardHeader">
            <h3>{selectedUserData.name}</h3>
          </div>
          <div className="ProfileCardBody">
            <div className="ProfileCardInfo">
              <p>
                <strong>Year of Study:</strong> {selectedUserData.yearOfStudy}
              </p>
              <p>
               <strong>Major:</strong> {selectedUserData.major}
              </p>
            </div>
            <div className="ProfileCardCourses">
              <p>
                {/* <strong>Past Courses:</strong> {userData.pastCourses.join(", ")} */}
              </p>
              <p>
            <strong>Current Courses:</strong>{" "}
            {/* {userData.currentCourses.join(", ")} */}
          </p>
        </div>
        <div className="ProfileCardDescription">
          <p>
            <strong>Description:</strong> {selectedUserData.description}
          </p>
        </div>
        {selectedUserData.image && (
          <div className="ProfileCardImage">
            <img src={`data:image/png;base64, ${selectedUserData.image}`} alt="User" />
          </div>
        )}
      </div>
        </div>
        </>
      )}
    </div>
  );
};

export default ChatPage;
