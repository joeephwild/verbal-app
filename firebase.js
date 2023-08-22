// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrlFwpTaikv-DbIt3BnseWFUBFwKte-AE",
  authDomain: "verbal-app-4aea3.firebaseapp.com",
  projectId: "verbal-app-4aea3",
  storageBucket: "verbal-app-4aea3.appspot.com",
  messagingSenderId: "87700826575",
  appId: "1:87700826575:web:055a521f903fe240388aba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase();
