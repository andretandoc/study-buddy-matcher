// Sidebar.js
import React, { useState, useEffect } from "react";
import { getChats, getChatUsers } from "../../../services/messages";

const Sidebar = ({ currentUserUid, onChatSelect }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        let userChats = await getChats(currentUserUid);

        // Iterate over each sub-array and filter out currentUserUid
        userChats = userChats.map((chatArray) =>
          chatArray.filter((chat) => chat !== currentUserUid)
        );

        setChats(userChats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [currentUserUid]);

  return (
    <div style={{ border: "3px solid black" }}>
      <h2>Your Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => onChatSelect(chat.users[1])}>
            {chat.users[1]}{" "}
            {/* Assuming users[1] is the UID of the other user */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
