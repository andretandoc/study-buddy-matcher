import React, { useState, useEffect } from "react";
import "./Accounts.css";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import {
  updateUserInformation,
  fetchUserDetails,
  addUserInformation,
} from "../../services/account";

const Accounts = () => {
  // State variables for user information
  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [yearsOfStudy, setYearsOfStudy] = useState("");
  const [description, setDescription] = useState("");
  const [pastCourses, setPastCourses] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [newPastCourse, setNewPastCourse] = useState("");
  const [newCurrentCourse, setNewCurrentCourse] = useState("");
  const [user, setUser] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    // Firebase Auth state observer
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);

        // Fetch user details using the auth user ID
        const userDetails = await fetchUserDetails(authUser.uid);
        console.log(userDetails);
        // Set the relevant data if user details are found
        if (userDetails) {
          setName(userDetails.name || "");
          setMajor(userDetails.major || "");
          setYearsOfStudy(userDetails.yearsOfStudy || "");
          setDescription(userDetails.description || "");
          setPastCourses(userDetails.pastCourses || []);
          setCurrentCourses(userDetails.currentCourses || []);
          setPreviewImage(userDetails.image || ""); // Decode and set the image preview
          setBase64Image(userDetails.image || ""); // Set the image preview
        } else {
          addUserInformation(authUser.uid);
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

  // Function to convert image file to base64 with downsampling
  const convertImageToBase64 = (imageFile, maxSizeInBytes) => {
    return new Promise((resolve, reject) => {
      setIsProcessing(true);

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Calculate the new dimensions to maintain aspect ratio
          let width = img.width;
          let height = img.height;
          const aspectRatio = width / height;
          const maxDimension = Math.sqrt(maxSizeInBytes);
          if (width > height) {
            width = maxDimension;
            height = width / aspectRatio;
          } else {
            height = maxDimension;
            width = height * aspectRatio;
          }

          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;

          // Draw the image on the canvas with downsampling
          ctx.drawImage(img, 0, 0, width, height);

          // Convert the canvas content to base64
          const base64String = canvas.toDataURL("image/jpeg", 0.9); // Adjust the quality if needed
          setIsProcessing(false);
          resolve(base64String);
        };
        img.src = event.target.result;
      };
      reader.onerror = (error) => {
        setIsProcessing(false);
        reject(error);
      };
      reader.readAsDataURL(imageFile);
    });
  };

  // Function to handle image file selection
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);

      // Read the image file and set the preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Convert image to base64 with downsampling
      const base64String = await convertImageToBase64(file, 1048487);
      const final = base64String.split(",")[1];
      setBase64Image(final);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if image processing is still ongoing
    if (isProcessing) {
      console.log("Image is still processing. Please wait.");
      return;
    }

    // Prepare user data
    const userData = {
      name,
      major,
      yearsOfStudy,
      description,
      pastCourses,
      currentCourses,
      image: base64Image || null,
    };

    console.log(userData);

    // Send user data to Firebase
    await updateUserInformation(user.uid, userData);

    // Clear the form or perform any other necessary actions
    // clearForm();
  };

  // Function to clear the form fields
  const clearForm = () => {
    setName("");
    setMajor("");
    setYearsOfStudy("");
    setDescription("");
    setPastCourses([]);
    setCurrentCourses([]);
    setNewPastCourse("");
    setImageFile(null);
    setBase64Image("");
    setPreviewImage("");
    setNewCurrentCourse("");
    setIsProcessing(false);
  };

  // Function to add a course when Enter key is pressed
  const handleCourseKeyPress = (
    e,
    courseList,
    setCourseList,
    setNewCourse,
    course
  ) => {
    if (e.key === "Enter" && course.trim() !== "") {
      setCourseList([...courseList, course.trim()]);
      setNewCourse("");
    }
  };

  // Function to manually add a course
  const handleAddCourse = (courseList, setCourseList, setNewCourse, course) => {
    if (course.trim() !== "") {
      setCourseList([...courseList, course.trim()]);
      setNewCourse("");
    }
  };

  return (
    <div className="UpdateProfileContainer">
      <h2>Update Account</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        {/* Major */}
        <label>
          Major:
          <input
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </label>

        {/* Years of Study */}
        <label>
          Years of Study:
          <input
            type="number"
            value={yearsOfStudy}
            onChange={(e) => setYearsOfStudy(e.target.value)}
          />
        </label>

        {/* Description */}
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        {/* Past Courses */}
        <label>
          Past Courses:
          <input
            type="text"
            value={newPastCourse}
            onChange={(e) => setNewPastCourse(e.target.value)}
          />
          {/* Display past courses */}
          <button
            type="button"
            onKeyDown={(e) =>
              handleCourseKeyPress(
                e,
                currentCourses,
                setCurrentCourses,
                setNewCurrentCourse,
                newPastCourse
              )
            }
            onClick={() =>
              handleAddCourse(
                pastCourses,
                setPastCourses,
                setNewPastCourse,
                newPastCourse
              )
            }
          >
            Add Past Course
          </button>
          <ul>
            {pastCourses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
          {/* Add Course button */}
        </label>

        {/* Current Courses */}
        <label>
          Current Courses:
          <input
            type="text"
            value={newCurrentCourse}
            onChange={(e) => setNewCurrentCourse(e.target.value)}
          />
          {/* Display current courses */}
          <button
            type="button"
            onKeyDown={(e) =>
              handleCourseKeyPress(
                e,
                currentCourses,
                setCurrentCourses,
                setNewCurrentCourse,
                newCurrentCourse
              )
            }
            onClick={() =>
              handleAddCourse(
                currentCourses,
                setCurrentCourses,
                setNewCurrentCourse,
                newCurrentCourse
              )
            }
          >
            Add Current Course
          </button>
          <ul>
            {currentCourses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
          {/* Add Course button */}
        </label>

        {/* Image Upload */}
        <label>
          Profile Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        {isProcessing && <div className="Loader">Processing...</div>}
        {previewImage && (
          <div className="ImagePreview">
            <img
              style={{ height: "400px", width: "auto", borderRadius: "10px" }}
              src={`data:image/png;base64, ${previewImage}`}
              alt="Preview"
            />
          </div>
        )}

        {/* Submit button */}
        <button disabled={isProcessing}>Update Account</button>
      </form>
    </div>
  );
};

export default Accounts;
