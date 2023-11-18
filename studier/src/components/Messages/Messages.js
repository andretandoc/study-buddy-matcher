// ChatPage.js
import React, { useState, useEffect } from "react";
import {
  createChat,
  getChatMessages,
  addChatMessage,
} from "../../services/messages";
const Messages = ({ currentUserUid, matchUid }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const getMessages = async () => {
      try {
        const chatMessages = await getChatMessages(currentUserUid, matchUid);
        setMessages(chatMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [currentUserUid, matchUid]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    // Update local state immediately
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        senderUid: currentUserUid,
        text: newMessage,
      },
    ]);

    try {
      // Add the message to the database
      await addChatMessage(currentUserUid, matchUid, newMessage);
      setNewMessage(""); // Clear the input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>
              {message.senderUid === currentUserUid ? "You" : "Other User"}:
            </strong>{" "}
            {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
