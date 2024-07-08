import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBf8pstYeFpic8SeIwR0sWnK4WxK9uAaMc",
  authDomain: "hairstylecalendar.firebaseapp.com",
  databaseURL: "https://hairstylecalendar-default-rtdb.firebaseio.com",
  projectId: "hairstylecalendar",
  storageBucket: "hairstylecalendar.appspot.com",
  messagingSenderId: "648004642153",
  appId: "1:648004642153:web:38d64f94526db0201cc9f8"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export {  signInWithPopup };