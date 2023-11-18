import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoUKtHHWyHloIcRSmvFOpSGjVri3Sk7L0",
  authDomain: "studium-e8bc7.firebaseapp.com",
  projectId: "studium-e8bc7",
  storageBucket: "studium-e8bc7.appspot.com",
  messagingSenderId: "549229249167",
  appId: "1:549229249167:web:f6206d916624952888a6fa",
  measurementId: "G-D5YQ2ZLNK4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (auth, formData) => {
  console.log(formData);
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email: formData.email,
      name: formData.name,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logOut = async () => {
  await signOut(auth);
};

const fetchUserDetails = async (uid) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]; // Assuming 'uid' is unique and only returns one result
      console.log(userDoc);
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
const updateUserDetails = async (uid, userDetails) => {
  try {
    // Query to find the user document based on the uid field
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Assuming uid is unique and only returns one result
      const userDocRef = querySnapshot.docs[0].ref;
      await updateDoc(userDocRef, userDetails);
      console.log("User details updated successfully");
    } else {
      console.log("No user found with UID:", uid);
    }
  } catch (error) {
    console.error("Error updating user details:", error);
    throw error;
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  app,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  fetchUserDetails,
  updateUserDetails,
};
