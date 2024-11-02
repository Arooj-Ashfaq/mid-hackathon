// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBA-6B9rVnqnKsEWm7QTYXzbJXsryWeFas",
  authDomain: "doctorapp-1f126.firebaseapp.com",
  projectId: "doctorapp-1f126",
  storageBucket: "doctorapp-1f126.firebasestorage.app",
  messagingSenderId: "216332374920",
  appId: "1:216332374920:web:12e45d09fe033bb071203d",
  measurementId: "G-J2ZJ6GGFT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

