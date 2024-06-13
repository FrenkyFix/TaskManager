// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-egorenko.firebaseapp.com",
  projectId: "taskmanager-egorenko",
  storageBucket: "taskmanager-egorenko.appspot.com",
  messagingSenderId: "106868341709",
  appId: "1:106868341709:web:630b5bc327aa9f53822284"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);