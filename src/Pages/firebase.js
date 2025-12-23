
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDZRCP78KTY1-3jhyHB7uubmpgPNwqbLo",
  authDomain: "food-f793b.firebaseapp.com",
  projectId: "food-f793b",
  storageBucket: "food-f793b.appspot.com",
  messagingSenderId: "875650557407",
  appId: "1:875650557407:web:9811c62d91a40ae8acd06a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



