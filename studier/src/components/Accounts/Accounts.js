import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../services/firebase";
import "./Accounts.css";
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
import { updateUserInfo } from "../../services/account";

function Accounts() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [major, setMajor] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState(0);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [pastCourses, setPastCourses] = useState([]);
  const [user, setUser] = useState(null); // To store the authenticated user
  const navigate = useNavigate();
  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userEmail = user.providerData[0].email;
        console.log(user);

        const usersCollection = collection(db, "users");
        const queryUsers = query(
          usersCollection,
          where("email", "==", userEmail)
        );

        const queryUsersSnapshot = await getDocs(queryUsers);
        //console.log(!queryUsersSnapshot.empty);
        if (!queryUsersSnapshot.empty) {
          const usersDocRef = queryUsersSnapshot.docs[0].ref;

        }

        const userInformationCollection = collection(db, "user_information");
        const queryUserInformation = query(
          userInformationCollection,
          where("", "==", userEmail)
        );
        //console.log(user.providerData[0].email);
        const querySnapshot = await getDocs(queryUserInformation);
        //console.log(querySnapshot);
        //console.log("user.id" + user.uid);
        if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref;
          //console.log(userDocRef.name);
          setName(user.name);
          setDescription(user.description);
          setImage(user.image);
          setMajor(user.major);
          setYearOfStudy(user.yearOfStudy);
          setCurrentCourses(user.setCurrentCourses);
          setPastCourses(user.setPastCourses);
        } else {
          addDoc(collection(db, "user_information"), {
            uid: user.uid,
            name: "",
            major: "",
            description: "",
            image: "",
            yearOfStudy: 0,
            currentCourses: [],
            pastCourses: [],
          });
        }
      } else {
        // Redirect to the root path if there's no signed-in user
        navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="AccountInfoContainer">
      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Major</label>
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>yearOfStudy</label>
          <input
            type="number"
            value={yearOfStudy}
            onChange={(e) => setYearOfStudy(e.target.value)}
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={updateUserInfo}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Accounts;
