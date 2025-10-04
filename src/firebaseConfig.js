// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyA9d6xgHbHFZOUY12McZYO2zpAoMnYCKrY",

  authDomain: "can-vis-services.firebaseapp.com",

  projectId: "can-vis-services",

  storageBucket: "can-vis-services.firebasestorage.app",

  messagingSenderId: "718303169195",

  appId: "1:718303169195:web:ee0ff86753120bd71785ee"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth instance
export const auth = getAuth(app);
export const db = getFirestore(app);
