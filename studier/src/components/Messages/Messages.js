import React, { useState, useEffect } from "react";
import {
  createChat,
  getChatMessages,
  addChatMessage,
} from "../../services/messages";
import "./Messages.css"; // Import a CSS file for styling

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

  const handleKeyPress = (e) => {
    // Check if the pressed key is Enter (keyCode 13)
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior (e.g., line break)
      sendMessage(); // Call the sendMessage function
    }
  };

  return (
    <div className="messages-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.senderUid === currentUserUid
                ? "message right"
                : "message left"
            }
          >
            <strong>
              {message.senderUid === currentUserUid ? "You" : "Other User"}:
            </strong>{" "}
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress} // Handle keypress event
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
