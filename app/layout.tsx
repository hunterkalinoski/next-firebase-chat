"use client";

import Navbar from "@components/Navbar";
import { auth } from "@lib/firebase";
import { data } from "@lib/initial-counter";
import { UserDataContext } from "@lib/userDataContext";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [authState] = useAuthState(auth);
  const [userData, setUserData] = useState({ uid: "", email: "", username: "" });

  // replace with grabbing user document from firestore
  async function fetchUserData() {
    return { uid: "myuid", email: "myemail", username: "myusername" };
  }

  // when auth state changes (log in or sign out), set userdata
  useEffect(() => {
    fetchUserData().then((userDoc) => {
      // this would likely change to something like:
      // uid: userDoc.id
      // email: userDoc.data.email
      // username: userDoc.data.username
      // uid not stored in the document, because it will be the documents name
      const user = { uid: userDoc.uid, email: userDoc.email, username: userDoc.username };
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
