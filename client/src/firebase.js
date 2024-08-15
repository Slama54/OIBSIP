// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pizza-mern.firebaseapp.com",
  projectId: "pizza-mern",
  storageBucket: "pizza-mern.appspot.com",
  messagingSenderId: "1036132172724",
  appId: "1:1036132172724:web:b4d3559608259fc052e8e1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);