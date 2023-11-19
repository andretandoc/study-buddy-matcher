import React, { useState, useEffect } from "react";
import { getChatMessages, addChatMessage } from "../../services/messages";
import "./Messages.css"; // Import a CSS file for styling

const Messages = ({ currentUserUid, matchUid }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  console.log("other chatter");
  console.log(matchUid);

  useEffect(() => {
    const unsubscribe = getChatMessages(currentUserUid, matchUid, setMessages);

    return () => {
      // Unsubscribe from real-time updates when component unmounts
      unsubscribe();
    };
  }, [currentUserUid, matchUid]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
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
          className="text-field"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress} // Handle keypress event
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
