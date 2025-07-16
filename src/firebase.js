// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZn-4nwdsxQFDEinUs3aNlq1gCBd57Xps", // paste yours here
  authDomain: "inventory-managment-45bc0.firebaseapp.com",
  projectId: "inventory-managment-45bc0",
  storageBucket: "inventory-managment-45bc0.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "1:XXXXXX:web:XXXXXX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
