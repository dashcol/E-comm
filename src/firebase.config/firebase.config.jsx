// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIVeaCg8Y7UwOqSsMXFFxyWOrTXN5dScA",
  authDomain: "e-commerce-3fa5e.firebaseapp.com",
  projectId: "e-commerce-3fa5e",
  storageBucket: "e-commerce-3fa5e.firebasestorage.app",
  messagingSenderId: "952511247935",
  appId: "1:952511247935:web:14eef50002654b8f382a8a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
