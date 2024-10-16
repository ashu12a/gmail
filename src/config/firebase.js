// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2TzatYnWi6LdDuQpoY8s0CGARPXAu_7Y",
  authDomain: "fir-333d2.firebaseapp.com",
  projectId: "fir-333d2",
  storageBucket: "fir-333d2.appspot.com",
  messagingSenderId: "781167024916",
  appId: "1:781167024916:web:3bf1a5b8b01919cdae8001"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };