"use client";

import { auth } from "@lib/firebase";
import { useRouter } from "next/navigation";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function Page({}) {
  const router = useRouter();
  const [signInWithEmailAndPassword, loggedInUser, signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth);

  const signUp = async () => {
    const user = await signInWithEmailAndPassword("test@gmail.com", "password");
    if (!user) {
      // signInError is undefined here??? even after awaiting the function?
      // it turns into 'email in use' or whatever later, but not in time
      alert(signInError?.message);
      alert("failed to sign in");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="mt-8 flex items-center justify-center">
      <button onClick={signUp}>Sign in</button>
    </div>
  );
}
