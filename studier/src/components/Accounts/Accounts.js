import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebase";


function Accounts() {
  const [userId,setUserId] = useState(""); 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [major, setMajor] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState(0);
  const [currentCourses,setCurrentCourses] = useState(""); 
  const [pastCourses,setPastCourses] = useState(""); 
  const [user, setUser] = useState(null); // To store the authenticated user
  const navigate = useNavigate();


  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUserId(user)
      } else {
        // Redirect to the root path if there's no signed-in user
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.info_id != "") {
        setName(auth.name);
        setDescription(auth.description);
        setImage(auth.image);
        setMajor(auth.major);
        setYearOfStudy(auth.yearOfStudy);
        setCurrentCourses(auth.setCurrentCourses);
        setPastCourses(auth.setPastCourses);
      } 
 
    });

  }, [user]);



  return (
    <div className="AccountInfoContainer" >
    <div>
        <label>Image Figure out later</label>
        <input
                type="name"
                value={image}
                onChange={(e) => setImage(e.target.value)}
        />
    </div>
    <div>
        <label>Name</label>
        <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
        />
    </div>
    <div>
        <label>Major</label>
        <input
                type="name"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
        />
    </div>
    <div>
        <label>Year Of Study</label>
        <input
                type="name"
                value={yearOfStudy }
                onChange={(e) => setYearOfStudy(e.target.value)}
        />
    </div> 
    <div>
        <label>Current Courses</label>
        <input
                type="name"
                value={currentCourses}
                onChange={(e) => setCurrentCourses(e.target.value)}
        />
    </div> 
    <div>
        <label>Past Courses</label>
        <input
                type="name"
                value={pastCourses}
                onChange={(e) => setPastCourses(e.target.value)}
        />
    </div>    

    <div>
        <label>Description</label>
        <input
                type="name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
        />
    </div>    
        
    </div>

  );
}

export default Accounts;
