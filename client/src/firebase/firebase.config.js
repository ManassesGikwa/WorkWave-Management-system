// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "UwzTsg.a2uoYA:7MkWBwETy-mIpyr2zn8NaA15IcBFrgQPvvX6toPLurA",
  authDomain: "employee-management-6b961.firebaseapp.com",
  projectId: "employee-management-6b961",
  storageBucket: "employee-management-6b961.appspot.com",
  messagingSenderId: "517301909763",
  appId: "1:517301909763:web:8ecdd03ab096877503d136"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;