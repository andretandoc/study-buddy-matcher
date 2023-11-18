// getRandomUsers.js
import { db } from "./firebase";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  doc,
  deleteDoc,
  addDoc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";

const getRandomUsers = async (count, uid) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userId", "==", uid));

    const usersSnapshot = await getDocs(q);

    const usersData = [];

    usersSnapshot.forEach((doc) => {
      usersData.push({ id: doc.id, ...doc.data() });
    });

    // Shuffle the array (you can use a more sophisticated shuffle algorithm)
    const shuffledUsers = usersData.sort(() => Math.random() - 0.5);

    // Return the specified number of randomized users
    return shuffledUsers.slice(0, count);
  } catch (error) {
    console.error("Error fetching randomized users:", error);
    throw error;
  }
};

export { getRandomUsers };
