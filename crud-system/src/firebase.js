// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore}  from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQhfnLJYLfEvTKxl_X8rNa3O5m4AAuSSY",
  authDomain: "crud-b482c.firebaseapp.com",
  projectId: "crud-b482c",
  storageBucket: "crud-b482c.appspot.com",
  messagingSenderId: "819002097012",
  appId: "1:819002097012:web:3ccd8c67cc32aecb4c8021"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth = getAuth(app)