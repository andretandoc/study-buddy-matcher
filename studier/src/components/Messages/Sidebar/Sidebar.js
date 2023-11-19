// Sidebar.js
import React, { useState, useEffect } from "react";
import { getChats, getChatUsers } from "../../../services/messages";
import "./Sidebar.css"; // Import a CSS file for styling
import { fetchUserDetails } from "../../../services/firebase";

const Sidebar = ({ currentUserUid, onChatSelect }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userChats = await getChats(currentUserUid);

        // Create an array of promises for fetching user details
        const userDetailPromises = userChats.map(async (chat) => {
          const otherUserUid = chat.users.find((uid) => uid !== currentUserUid);
          console.log(otherUserUid);
          const info = await fetchUserDetails(otherUserUid);
          const name = info.name;
          return { id: chat.id, otherUserUid, name };
        });

        // Wait for all promises to resolve using Promise.all
        const userDetailResults = await Promise.all(userDetailPromises);
        console.log(userDetailResults);
        setChats(userDetailResults);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [currentUserUid]);

  return (
    <div className="sidebar-container">
      <h2>Your Chats</h2>
      <ul className="chat-list">
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => onChatSelect(chat.otherUserUid)}>
            {chat.name}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
