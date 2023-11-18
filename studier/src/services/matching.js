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
  setDoc,
  updateDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";

const getRandomUsers = async (count, uid) => {
  try {
    const usersRef = collection(db, "users");

    // Query all users except the one with the specified UID
    const q = query(usersRef, where("uid", "!=", uid));

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

const likeUser = async (likerUid, likedUserId) => {
  try {
    const likesCollection = collection(db, "likes");

    // Create a document in the 'likes' collection representing the like
    await setDoc(doc(likesCollection, `${likerUid}_${likedUserId}`), {
      likedUserId,
      likedAt: new Date(),
    });

    // You can perform additional actions if needed, such as updating UI, fetching new users, etc.
  } catch (error) {
    console.error("Error liking user:", error);
    throw error;
  }
};

const dislikeUser = async (dislikerUid, dislikedUserId) => {
  try {
    const likesCollection = collection(db, "likes");

    // Delete the document in the 'likes' collection representing the dislike
    await deleteDoc(doc(likesCollection, `${dislikerUid}_${dislikedUserId}`));

    // You can perform additional actions if needed, such as updating UI, fetching new users, etc.
  } catch (error) {
    console.error("Error disliking user:", error);
    throw error;
  }
};

export { likeUser, dislikeUser, getRandomUsers };
