// Matching.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import {
  getRandomUsers,
  likeUser,
  dislikeUser,
  haveMutualLike,
} from "../../services/matching";
import "./Matching.css";
import ProfileCard from "./ProfileCard/ProfileCard";
import MatchPopup from "./Popup/Popup";

function Matching() {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatchPopup, setShowMatchPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        // Redirect to the root path if there's no signed-in user
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    // Function to fetch randomized users
    const fetchRandomUsers = async () => {
      try {
        if (user && user.uid) {
          const randomizedUsers = await getRandomUsers(10, user.uid);
          setUsers(randomizedUsers);
        }
      } catch (error) {
        console.error("Error fetching randomized users:", error);
      }
    };

    fetchRandomUsers();
  }, [user]);

  const handleLikeOrDislike = async (likedUserId, isLike) => {
    try {
      // Slide the card off the screen before removing it from the array
      const card = document.getElementById(`profileCard_${likedUserId}`);
      if (card) {
        card.style.transform = isLike
          ? "translateX(250%) translateY(-50%) scale(0.8)"
          : "translateX(-250%) translateY(-50%) scale(0.8)";

        // Wait for the animation to complete before removing the card
        setTimeout(() => {
          // Remove the disliked user from the array
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.uid !== likedUserId)
          );

          // Move to the next user card
          setCurrentIndex((prevIndex) =>
            prevIndex < users.length - 1 ? prevIndex + 1 : prevIndex
          );
        }, 300); // Adjust the timeout based on your transition duration
      }

      // Handle liking or disliking the user (outside the animation timeout)
      if (isLike) {
        await likeUser(user.uid, likedUserId);
        const mutual = await haveMutualLike(user.uid, likedUserId);
        if (mutual) {
          // Show the MatchPopup when there is a mutual like
          setShowMatchPopup(true);

          // Set a timer to hide the popup after 2 seconds
          setTimeout(() => {
            setShowMatchPopup(false);
          }, 2400);
        }
      } else {
        await dislikeUser(user.uid, likedUserId);
      }
    } catch (error) {
      console.error(`Error handling ${isLike ? "like" : "dislike"}:`, error);
    }
  };

  return (
    <div className="Matching">
      <h1>Matching</h1>
      <div className="ProfileCardsContainer">
        {users.map((userData, index) => (
          <ProfileCard
            key={userData.id}
            userData={userData}
            isActive={index === currentIndex}
            onLike={() => handleLikeOrDislike(userData.uid, true)}
            onDislike={() => handleLikeOrDislike(userData.uid, false)}
          />
        ))}
      </div>

      {showMatchPopup && (
        <MatchPopup onClose={() => setShowMatchPopup(false)} />
      )}
    </div>
  );
}

export default Matching;
