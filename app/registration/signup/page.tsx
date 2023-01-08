"use client";

import { auth, firestore } from "@lib/firebase";
import { EmailPasswordContext } from "@lib/registrationContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ColorRing } from "react-loader-spinner";

export default function Page({}) {
  const router = useRouter();
  const [createUserWithEmailAndPassword, registeredUser, createLoading, createError] =
    useCreateUserWithEmailAndPassword(auth);

  const { email, password } = useContext(EmailPasswordContext);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    if (username == "") {
      alert("You must enter a username!");
      return;
    } else if (username.length > 10) {
      alert("Username may be 10 characters max");
      return;
    }
    setLoading(true);

    // create user auth
    const userCredential = await createUserWithEmailAndPassword(email, password);
    if (!userCredential) {
      alert("failed to sign up!");
      setLoading(false);
      return;
    }
    const user = userCredential.user;

    // create user document
    await setDoc(doc(firestore, "users", user.uid), {
      email: user.email,
      username,
      createdAt: serverTimestamp(),
    });
    setLoading(false);

    router.push("/");
  };

  // allows navigation to '/' to be done immediately after sign in was successful
  // otherwise, takes 500ms or something to transition pages, but auth state change can be observed in navbar
  useEffect(() => {
    router.prefetch("/");
  }, [router]);

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
      {loading && (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#64748b", "#64748b", "#64748b", "#64748b", "#64748b"]}
        />
      )}
    </div>
  );
}
