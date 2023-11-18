import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";
import { getRandomUsers } from "../../services/matching";

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
          console.log(user.uid);
          const randomizedUsers = await getRandomUsers(5, user.uid);
          setUsers(randomizedUsers);
        }
      } catch (error) {
        console.error("Error fetching randomized users:", error);
      }
    };

    fetchRandomUsers();
  }, [user]);

  return (
    <div className="Matching">
      <h1>Matching</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          {/* Add other user information or components here */}
        </div>
      ))}
    </div>
  );
}

export default Matching;
