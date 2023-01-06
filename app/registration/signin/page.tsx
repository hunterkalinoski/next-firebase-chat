"use client";

import { auth } from "@lib/firebase";
import { EmailPasswordContext } from "@lib/registrationContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function Page({}) {
  const router = useRouter();
  const [signInWithEmailAndPassword, loggedInUser, signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth);

  const { email, password } = useContext(EmailPasswordContext);

  const signIn = async () => {
    const user = await signInWithEmailAndPassword(email, password);
    if (!user) {
      // signInError is undefined here??? even after awaiting the function?
      // it turns into 'email in use' or whatever later, but not in time
      // alert(signInError?.message);
      alert("failed to sign in");
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
    <div className="mt-8 flex items-center justify-center">
      <button onClick={signIn}>Sign in</button>
    </div>
  );
}
