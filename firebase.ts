import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { ref } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEu9KXACzpwL-UhBsKubfIVjYdFh35mVg",
  authDomain: "hairstylecalendar.firebase.com",
  projectId: "hairstylecalendar",
  storageBucket: "hairstylecalendar.appspot.com",
  messagingSenderId: "648004642153",
  appId: "1:648004642153:android:6921b68a7c0ae0441cc9f8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const createUser = async (
//   Ime: string,
//   Prezime: string,
//   Email: string,
//   Lozinka: string,
//   Datum_rodjenja: string,
//   Telefon: string,
//   Spol: string
// ) => {
//   const usersCollection = collection(db, "users");
//   const newUser = { Ime, Prezime, Email, Lozinka, Datum_rodjenja, Telefon, Spol};
//   await addDoc(usersCollection, newUser);
// };

// export const getUsers = async () => {
//   const usersCollection = collection(db, "users");
//   const querySnapshot = await getDocs(usersCollection);

//   return querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
// };

// export const createProfile = async (response: any) => {
//   const usersCollection = collection(db, "users");
//   const userDoc = doc(usersCollection, response.user.email);

//   await setDoc(userDoc, {
//     Ime,
//     lastName,
//     phoneNumber,
//     email,
//   });

//   console.log("User profile created successfully");
// };
