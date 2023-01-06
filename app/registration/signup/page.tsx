"use client";

import { auth } from "@lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function Page({}) {
  const router = useRouter();
  const [createUserWithEmailAndPassword, registeredUser, createLoading, createError] =
    useCreateUserWithEmailAndPassword(auth);

  const signUp = async () => {
    const user = await createUserWithEmailAndPassword("test@gmail.com", "password");
    if (!user) {
      // createError is undefined here??? even after awaiting the function?
      // it turns into 'email in use' or whatever later, but not in time
      alert("failed to sign up");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    console.log("createError: ", createError);
  }, [createError]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-4">
      <div className="flex flex-row gap-16">
        <label className="w-32 text-lg text-gray-200" htmlFor="displayNameInput">
          Display name:
        </label>
        <input
          className="rounded-lg bg-slate-500 px-2 py-1 text-gray-200 focus:outline focus:outline-1 focus:outline-slate-300"
          type="text"
          name="displayNameInput"
        />
      </div>
      <button className="mt-4" onClick={signUp}>
        Sign Up
      </button>
    </div>
  );
}
