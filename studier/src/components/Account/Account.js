import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth,db } from "../../services/firebase";
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

function Account() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [major, setMajor] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState(0);
  const [currentCourses,setCurrentCourses] = useState([]); 
  const [pastCourses,setPastCourses] = useState([]); 
  const [uid, setUid] = useState("");
  const [user, setUser] = useState(null); // To store the authenticated user
  const navigate = useNavigate();


  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        // Redirect to the root path if there's no signed-in user
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    // Firebase Auth state observer
    const checkIfKeyExists = async (key) => {
      try {
        // Get a reference to the "user_information" collection
        const userInformationCollection = collection(db,'user_information');
    
        // Query the collection to check if the key exists
        //const querySnapshot = await userInformationCollection.where('uid', '==', key).get();
        const q = query(userInformationCollection, where("uid", "==", key));
        const usersSnapshot = await getDocs(q);
        // If there are documents in the result, the key exists
        return !usersSnapshot.empty;
      } catch (error) {
        console.error("Error checking if key exists:", error);
        return false;
      }
    };
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const keyToCheck = auth.uid;
      checkIfKeyExists(keyToCheck).then((exists) => {
      if (exists) {
        setName(auth.name);
        setDescription(auth.description);
        setImage(auth.image);
        setMajor(auth.major);
        setYearOfStudy(auth.yearOfStudy);
        setCurrentCourses(auth.setCurrentCourses);
        setPastCourses(auth.setPastCourses);


        console.log(`Key "${keyToCheck}" exists in the user_information collection.`);
      } else {
        console.log(`Key "${keyToCheck}" does not exist in the user_information collection.`);
        setDoc(doc(db, "user_information", keyToCheck), {
          name: "",
          description: "",
          image: "",
          major: "",
          yearOfStudy: 0,
          currentCourses: [],
          pastCourses: [],
          uid: keyToCheck
        });
        setUid(keyToCheck);
      }
      });
    });
  }, [user]);



  return (
    <div className="AccountInfoContainer" >
      <form>
      <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


      </form>
    </div>

  );
}

export default Account;
