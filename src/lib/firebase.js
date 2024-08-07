// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// == Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: "AIzaSyAPUFi7VJweQsbIM8-b6OTX4z3flrg8cnQ",
  authDomain: "chatmei-7eacd.firebaseapp.com",
  projectId: "chatmei-7eacd",
  storageBucket: "chatmei-7eacd.appspot.com",
  messagingSenderId: "733127386597",
  appId: "1:733127386597:web:c3ef89ae491fec04afbb0c",
  measurementId: "G-EV5M5SE5K4",
};

// == Initialize Firebase app
const app = initializeApp(firebaseConfig);

// == Export Firebase services for use in the app
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
