// ChatPage.js
import React, { useState, useEffect } from "react";
import Messages from "./Messages";
import Sidebar from "./Sidebar/Sidebar";

const ChatPage = ({ currentUserUid }) => {
  const [selectedChatUid, setSelectedChatUid] = useState(null);

  const handleChatSelect = (chatUid) => {
    setSelectedChatUid(chatUid);
  };

  return (
    <div style={{ border: "3px solid black" }}>
      <Sidebar
        currentUserUid={currentUserUid}
        onChatSelect={handleChatSelect}
      />
      {selectedChatUid && (
        <Messages currentUserUid={currentUserUid} matchUid={selectedChatUid} />
      )}
    </div>
  );
};

export default ChatPage;
