// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg_HO_zHCkDM2FANHKepGc_eTPZBVNjGU",
  authDomain: "email-password-auth-be15f.firebaseapp.com",
  projectId: "email-password-auth-be15f",
  storageBucket: "email-password-auth-be15f.firebasestorage.app",
  messagingSenderId: "161898681154",
  appId: "1:161898681154:web:cf8962e9c19e1d1e54aedb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);