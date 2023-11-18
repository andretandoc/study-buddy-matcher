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








const updateUserInfo = (uid,name,description,image,major,yearsOfStudy) => {
    console.log("hi");


}


export {
    
  updateUserInfo
};