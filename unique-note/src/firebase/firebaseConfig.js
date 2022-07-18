import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, getDocs, query, where, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC5bL4OabRil6ED86wWsfKa5IH3J81RpUA",
  authDomain: "unique-notes-3d54a.firebaseapp.com",
  projectId: "unique-notes-3d54a",
  storageBucket: "unique-notes-3d54a.appspot.com",
  messagingSenderId: "708189321091",
  appId: "1:708189321091:web:55ca9ea0cdb10e16bf68b6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth  = getAuth(app)
export const db = getFirestore(app)
export { getDocs, query, where,collection }