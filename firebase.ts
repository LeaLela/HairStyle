import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCEu9KXACzpwL-UhBsKubfIVjYdFh35mVg",
  authDomain: "hairstylecalendar.firebase.com",
  projectId: "hairstylecalendar",
  storageBucket: "hairstylecalendar.appspot.com",
  messagingSenderId: "648004642153",
  appId: "1:648004642153:android:6921b68a7c0ae0441cc9f8",
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);