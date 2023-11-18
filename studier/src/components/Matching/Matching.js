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

function Matching() {
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);
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
          const randomizedUsers = await getRandomUsers(5, user.uid);
          setUsers(randomizedUsers);
        }
      } catch (error) {
        console.error("Error fetching randomized users:", error);
      }
    };

    fetchRandomUsers();
  }, [user]);

  const handleLike = async (likedUserId) => {
    try {
      await likeUser(user.uid, likedUserId);

      // Check if the liked user has also liked the current user
      console.log(user.uid);
      console.log(likedUserId);
      const mutualLike = await haveMutualLike(user.uid, likedUserId);
      console.log(mutualLike);
      if (mutualLike) {
        // Show a popup or perform any action for a mutual like
        alert("Mutual Like! You and the user have liked each other!");
      }

      // You can perform additional actions if needed, such as updating UI, fetching new users, etc.
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleDislike = async (dislikedUserId) => {
    try {
      await dislikeUser(user.uid, dislikedUserId);
      // You can perform additional actions if needed, such as updating UI, fetching new users, etc.
    } catch (error) {
      console.error("Error handling dislike:", error);
    }
  };

  return (
    <div className="Matching">
      <h1>Matching</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <button onClick={() => handleLike(user.uid)}>Like</button>
          <button onClick={() => handleDislike(user.uid)}>Dislike</button>
        </div>
      ))}
    </div>
  );
}

export default Matching;
