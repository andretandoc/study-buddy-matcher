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

const fetchUserDetails = async (uid) => {
  try {
    const usersRef = collection(db, "user_information");
    const q = query(usersRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]; // Assuming 'uid' is unique and only returns one result
      return userDoc.data();
    } else {
      console.log("No user found with UID:", uid);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
const updateUserInformation = async (userId, userData) => {
  try {
    // console.log(userId);
    // console.log(userData);
    const userQuery = query(
      collection(db, "user_information"),
      where("uid", "==", userId)
    );
    const userDocs = await getDocs(userQuery);
    userDocs.forEach((userDoc) => {
      setDoc(userDoc.ref, { ...userData, uid: userId });
    });
    // await setDoc(doc(db, "user_information", userId), userData);
    console.log("User information updated successfully!");
  } catch (error) {
    console.error("Error updating user information: ", error);
  }
};

const updateUserInfo = async (
  uid,
  name,
  description,
  image,
  major,
  yearsOfStudy
) => {
  const userInformationRef = collection(db, "user_information");
  const userQuery = query(userInformationRef, where("uid", "==", uid));
  const userSnapshot = await getDocs(userQuery);

  if (!userSnapshot.empty) {
    const userDoc = userSnapshot.docs[0];
    console.log(uid);
    // Update user information
    await updateDoc(userDoc.ref, {
      name: name,
      description: description,
      image: image,
      major: major,
      yearsOfStudy: yearsOfStudy,
      uid: uid,
    });

    console.log("User information updated successfully.");
  } else {
    console.error("User not found in the database.");
  }
};

const addUserInformation = async (uid) => {
  await addDoc(collection(db, "user_information"), {
    uid: uid,
    name: "",
    major: "",
    description: "",
    image: "",
    yearsOfStudy: 0,
    currentCourses: [],
    pastCourses: [],
  });

  console.log("User information added successfully.");
};

export {
  fetchUserDetails,
  updateUserInfo,
  addUserInformation,
  updateUserInformation,
};
