import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "rusyn-culture-hub.firebaseapp.com",
  projectId: "rusyn-culture-hub",
  storageBucket: "rusyn-culture-hub.appspot.com",
  messagingSenderId: "977731985146",
  appId: "1:977731985146:web:2ea3141fbe4086119db343",
  measurementId: "G-KPCF85PLWW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  app,
  db,
  storage,
  auth,
  provider
}