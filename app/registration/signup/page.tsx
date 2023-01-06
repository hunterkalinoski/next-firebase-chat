"use client";

import { auth } from "@lib/firebase";
import { EmailPasswordContext } from "@lib/registrationContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function Page({}) {
  const router = useRouter();
  const [createUserWithEmailAndPassword, registeredUser, createLoading, createError] =
    useCreateUserWithEmailAndPassword(auth);

  const { email, password } = useContext(EmailPasswordContext);
  const [username, setUsername] = useState("");

  const signUp = async () => {
    const user = await createUserWithEmailAndPassword(email, password);
    // TODO: also create firestore User document with displayName
    console.log(username);
    if (!user) {
      // createError is undefined here??? even after awaiting the function?
      // it turns into 'email in use' or whatever later, but not in time
      alert("failed to sign up");
    } else {
      router.push("/");
    }
  };

  // allows navigation to '/' to be done immediately after sign in was successful
  // otherwise, takes 500ms or something to transition pages, but auth state change can be observed in navbar
  useEffect(() => {
    router.prefetch("/");
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-4">
      <div className="flex flex-row gap-16">
        <label className="w-32 text-lg text-gray-200" htmlFor="usernameInput">
          Username:
        </label>
        <input
          type="text"
          name="usernameInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button className="mt-4" onClick={signUp}>
        Sign Up
      </button>
    </div>
  );
}
