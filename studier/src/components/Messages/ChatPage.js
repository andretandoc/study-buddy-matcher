// ChatPage.js
import React, { useState, useEffect } from "react";
import Messages from "./Messages";
import Sidebar from "./Sidebar/Sidebar";

const ChatPage = ({ currentUserUid }) => {
  const [selectedChatUid, setSelectedChatUid] = useState(null);
  // const [otherUserUid, setOtherUserUid] = useState(null);

  const handleChatSelect = (chatId, otherUserUid) => {
    setSelectedChatUid(chatId);
    // setOtherUserUid(otherUserUid);
  };

  return (
    <div>
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
