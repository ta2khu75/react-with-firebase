// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// require("dotenv").config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// console.log(process.env.API_KEY_FIREBASE);

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB3fGmR3gf08V1lgiHyOEQNkv_D92RYxMQ",
    authDomain: "react-with-firebase-1726e.firebaseapp.com",
    projectId: "react-with-firebase-1726e",
    storageBucket: "react-with-firebase-1726e.appspot.com",
    messagingSenderId: "857731126630",
    appId: "1:857731126630:web:2ca3171664320eddffe4a7",
    measurementId: "G-H7L6VZ16J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();