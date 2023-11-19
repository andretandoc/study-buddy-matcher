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

const likesCollection = collection(db, "likes");
const chatsCollection = collection(db, "chats");

const getRandomUsers = async (count, uid) => {
  try {
    const usersRef = collection(db, "user_information");

    // Query all users except the one with the specified UID
    const q = query(usersRef, where("uid", "!=", uid));

    const usersSnapshot = await getDocs(q);

    const usersData = [];

    usersSnapshot.forEach((doc) => {
      usersData.push({ id: doc.id, ...doc.data() });
    });

    // Filter out users who have a mutual like
    const filteredUsers = await Promise.all(
      usersData.map(async (user) => {
        const liked = await checkLike(true, uid, user.uid);
        return liked ? null : user;
      })
    );

    // Remove null values (users with mutual likes) and shuffle the array
    const nonNullUsers = filteredUsers.filter((user) => user !== null);
    const shuffledUsers = nonNullUsers.sort(() => Math.random() - 0.5);

    // Return the specified number of randomized users
    return shuffledUsers.slice(0, count);
  } catch (error) {
    console.error("Error fetching randomized users:", error);
    throw error;
  }
};

const likeUser = async (likerUid, likedUserId) => {
  try {
    // Create a document in the 'likes' collection representing the like
    await setDoc(doc(likesCollection, `${likerUid}_${likedUserId}`), {
      likedUserId,
      likerUid,
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
    // Delete the document in the 'likes' collection representing the dislike
    await deleteDoc(doc(likesCollection, `${dislikerUid}_${dislikedUserId}`));

    // You can perform additional actions if needed, such as updating UI, fetching new users, etc.
  } catch (error) {
    console.error("Error disliking user:", error);
    throw error;
  }
};

const haveMutualLike = async (user1Uid, user2Uid) => {
  try {
    const user1LikedUser2 = await checkLike(false, user1Uid, user2Uid);
    // const user2LikedUser1 = await checkLike(user2Uid, user1Uid);
    if (user1LikedUser2) {
      // Create a chat document with a unique identifier for the matched users
      const chatId =
        user1Uid < user2Uid
          ? `${user1Uid}_${user2Uid}`
          : `${user2Uid}_${user1Uid}`;
      await setDoc(doc(chatsCollection, chatId), {
        users: [user1Uid, user2Uid],
      });
    }
    return user1LikedUser2;
  } catch (error) {
    console.error("Error checking mutual like:", error);
    throw error;
  }
};

const checkLike = async (oneWay, likerUid, likedUserId) => {
  try {
    // Check if likerUid likes likedUserId
    const q1 = query(
      likesCollection,
      where("likedUserId", "==", likedUserId),
      where("likerUid", "==", likerUid)
    );

    const querySnapshot1 = await getDocs(q1);

    // Check if likedUserId likes likerUid
    const q2 = query(
      likesCollection,
      where("likedUserId", "==", likerUid),
      where("likerUid", "==", likedUserId)
    );

    const querySnapshot2 = await getDocs(q2);

    if (oneWay) {
      return !querySnapshot1.empty;
    }

    return !querySnapshot1.empty && !querySnapshot2.empty;
  } catch (error) {
    console.error("Error checking like:", error);
    throw error;
  }
};

export { haveMutualLike, checkLike, likeUser, dislikeUser, getRandomUsers };
