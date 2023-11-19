// ChatPage.js
import React, { useState, useEffect } from "react";
import Messages from "./Messages";
import Sidebar from "./Sidebar/Sidebar";
import ProfileCardMessaging from "./ProfileCardMessaging";
import "./ChatPage.css"; // Import a new CSS file for styling
import { fetchUserDetails } from "../../services/firebase";

const ChatPage = ({ currentUserUid }) => {
  const [selectedChatUid, setSelectedChatUid] = useState(null);
  const [selectedUserData, selectedSetUserData] = useState("");

  const handleChatSelect = (chatId, otherUserUid) => {
    setSelectedChatUid(chatId);
    console.log("chat id and selectedChatId in ChatPage is: ");
    console.log(chatId);
    console.log(otherUserUid);
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
          <ProfileCardMessaging selected={selectedChatUid} />
        </>
      )}
    </div>
  );
};

export default ChatPage;
