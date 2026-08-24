// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRApP3r2_0p-oGsnuQHZwUucdPdpsTzeA",
  authDomain: "travel-planning-7e136.firebaseapp.com",
  projectId: "travel-planning-7e136",
  storageBucket: "travel-planning-7e136.firebasestorage.app",
  messagingSenderId: "170122723429",
  appId: "1:170122723429:web:e0a76e97e6c344ee43868c",
  measurementId: "G-DX4EL6CXFB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
