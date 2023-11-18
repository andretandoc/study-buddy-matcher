import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth,db } from "../../services/firebase";
import "./Accounts.css";
import { setDoc } from "firebase/firestore";

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
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const userInformationCollection = collection(db,'user_information');
      const q = query(userInformationCollection, where("uid", "==", auth.uid));
      const querySnapshot = getDocs(q);
      if (!querySnapshot.empty) {
        setName(auth.name);
        setDescription(auth.description);
        setImage(auth.image);
        setMajor(auth.major);
        setYearOfStudy(auth.yearOfStudy);
        setCurrentCourses(auth.setCurrentCourses);
        setPastCourses(auth.setPastCourses);
      }else{
        addDoc(collection(db, "user_information"), {
          uid: auth.uid,
          name: "",
          major: "",
          description: "",
          image: "",
          yearOfStudy: 0,
          currentCourses: [],
          pastCourses: []
        });
      }
    });
  }, [user]);

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
            Sign In with Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default Accounts;
