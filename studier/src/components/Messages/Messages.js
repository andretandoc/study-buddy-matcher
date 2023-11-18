import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import "./Messages.css";

function Messages() {
  // Placeholder data for conversation list
  const conversations = ["Alice", "Bob", "Charlie"];

  return (
    <div className="messages-container">
      <div className="conversation-list">
        {conversations.map((name) => (
          <div key={name} className="conversation-item">{name}</div>
        ))}
      </div>
      <div className="chat-window">
        <div className="chat-header">Chat with Alice</div>
        <div className="message-area">
          {/* Messages will go here */}
        </div>
        <div className="message-input">
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}


export default Messages;
