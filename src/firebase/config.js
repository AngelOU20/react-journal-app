// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Authentication
import { getAuth } from "firebase/auth";
// Database access
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAykPyz5pDyo9DMzCLv_CrlICBd8-gHKgA",
  authDomain: "react-journal-app-9debc.firebaseapp.com",
  projectId: "react-journal-app-9debc",
  storageBucket: "react-journal-app-9debc.appspot.com",
  messagingSenderId: "332348295640",
  appId: "1:332348295640:web:0919508631112c283dcaad",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
