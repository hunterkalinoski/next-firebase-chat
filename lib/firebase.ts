import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbkTZTh23d15ofpawqy52NIe1dqbY5EHA",
  authDomain: "next-firebase-chat-da7b8.firebaseapp.com",
  projectId: "next-firebase-chat-da7b8",
  storageBucket: "next-firebase-chat-da7b8.appspot.com",
  messagingSenderId: "426020442153",
  appId: "1:426020442153:web:ab26565ea88e63faefcc38",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
