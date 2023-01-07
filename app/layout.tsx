"use client";

import Navbar from "@components/Navbar";
import { auth, firestore } from "@lib/firebase";
import { UserDataContext } from "@lib/userDataContext";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [authState] = useAuthState(auth);
  const [userData, setUserData] = useState({ uid: "", email: "", username: "" });

  // replace with grabbing user document from firestore
  async function fetchUserData() {
    const currUser = auth.currentUser;
    if (!currUser) {
      return null;
    }
    const uid = currUser.uid;
    const docRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap;
  }

  // when auth state changes (log in or sign out), set userdata
  useEffect(() => {
    fetchUserData().then((userDoc) => {
      let user;
      // if userdoc doesnt exist (when this fn called after signed out for example), set fields to default
      if (!userDoc) {
        user = { uid: "", email: "", username: "" };
      } else {
        user = {
          uid: userDoc.id,
          email: userDoc.data()?.email,
          username: userDoc.data()?.username,
        };
      }
      setUserData(user);
    });
  }, [authState]);

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-slate-700">
        <UserDataContext.Provider value={userData}>
          <Navbar />
          {children}
        </UserDataContext.Provider>
      </body>
    </html>
  );
}
