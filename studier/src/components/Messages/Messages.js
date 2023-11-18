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

    try {
      await addChatMessage(currentUserUid, matchUid, newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    // const checkAndCreateChat = async () => {
    //   try {
    //     const mutualLike = await haveMutualLike(currentUserUid, matchUid);
    //     if (mutualLike) {
    //       await createChat(currentUserUid, matchUid);
    //     }
    //   } catch (error) {
    //     console.error("Error checking mutual like and creating chat:", error);
    //   }
    // };
    // checkAndCreateChat();
  }, [currentUserUid, matchUid]);

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
