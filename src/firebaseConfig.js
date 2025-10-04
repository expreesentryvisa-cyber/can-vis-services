// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeNkzESPCUB0auwWZE8KJLEZw0eIxwHN8",
  authDomain: "fir-2f8b9.firebaseapp.com",
  projectId: "fir-2f8b9",
  storageBucket: "fir-2f8b9.firebasestorage.app",
  messagingSenderId: "850967099809",
  appId: "1:850967099809:web:4f51cc4f2fc33fa85133e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth instance
export const auth = getAuth(app);
export const db = getFirestore(app);