// firebaseFunctions.js
import { db } from "./firebase";
import {
  setDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

const chatsCollection = collection(db, "chats");

const createChat = async (user1Uid, user2Uid) => {
  try {
    // Create a unique chat ID based on user UIDs
    const chatId =
      user1Uid < user2Uid
        ? `${user1Uid}_${user2Uid}`
        : `${user2Uid}_${user1Uid}`;

    const chatRef = doc(chatsCollection, chatId);
    await setDoc(chatRef, { users: [user1Uid, user2Uid] });
  } catch (error) {
    console.error("Error creating chat:", error);
    throw error;
  }
};

const getChats = async (currentUserUid) => {
  try {
    const chatsQuery = query(
      chatsCollection,
      where("users", "array-contains", currentUserUid)
    );
    const chatsSnapshot = await getDocs(chatsQuery);
    const chatsData = chatsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return chatsData;
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
};
const getChatMessages = async (chatId) => {
  try {
    const chatRef = doc(chatsCollection, chatId);
    const messagesQuery = query(
      collection(chatRef, "messages"),
      orderBy("timestamp")
    );
    const messagesSnapshot = await getDocs(messagesQuery);
    return messagesSnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
};

const addChatMessage = async (currentUserUid, matchUid, newMessage) => {
  try {
    const chatId =
      currentUserUid < matchUid
        ? `${currentUserUid}_${matchUid}`
        : `${matchUid}_${currentUserUid}`;
    const chatRef = doc(chatsCollection, chatId);
    await addDoc(collection(chatRef, "messages"), {
      text: newMessage,
      senderUid: currentUserUid,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding chat message:", error);
    throw error;
  }
};

export { createChat, getChats, getChatMessages, addChatMessage };
