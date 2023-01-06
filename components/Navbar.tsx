"use client";

import { auth } from "@lib/firebase";
import Link from "next/link";
import { useEffect } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignOut,
} from "react-firebase-hooks/auth";

export default function Navbar({}) {
  const [authState, authLoading, authError] = useAuthState(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);
  const [createUserWithEmailAndPassword, registeredUser, createLoading, createError] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword, loggedInUser, signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth);

  // useEffect(() => {
  //   console.log("authState:", authState);
  //   console.log("loading", authLoading);
  //   console.log("error", authError);
  // }, [authState, authLoading, authError]);

  // useEffect(() => {
  //   console.log("registeredUser:", registeredUser);
  //   console.log("createLoading:", createLoading);
  //   console.log("createError:", createError);
  // }, [registeredUser, createLoading, createError]);

  // useEffect(() => {
  //   console.log("loggedInUser: ", loggedInUser);
  //   console.log("signInLoading: ", signInLoading);
  //   console.log("signInError: ", signInError);
  // }, [loggedInUser, signInLoading, signInError]);

  // useEffect(() => {
  //   console.log("signOutLoading: ", signOutLoading);
  //   console.log("signOutError: ", signOutError);
  // }, [signOutLoading, signOutError]);

  return (
    <div className="flex flex-row items-center justify-between bg-slate-800 px-20 py-4">
      <Link href="/">
        <h2 className="text-2xl font-bold text-gray-200 hover:underline">Next-Firebase Chat</h2>
      </Link>
      {authState ? (
        <div className="flex flex-row items-center gap-10">
          <h2 className="text-gray-200">Username</h2>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-4">
          <Link href="/registration/signin">
            <button>Sign In</button>
          </Link>
          <Link href="/registration/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      )}
      {/* <button
        onClick={() => createUserWithEmailAndPassword("test@gmail.com", "password")}
        className="rounded-lg border border-black bg-black bg-opacity-10 px-20 py-1 hover:bg-opacity-30"
      >
        Sign up
      </button>
      <button
        onClick={() => signInWithEmailAndPassword("test@gmail.com", "password")}
        className="rounded-lg border border-black bg-black bg-opacity-10 px-20 py-1 hover:bg-opacity-30"
      >
        Sign in
      </button>
      <button
        onClick={signOut}
        className="rounded-lg border border-black bg-black bg-opacity-10 px-20 py-1 hover:bg-opacity-30"
      >
        Sign Out
      </button> */}
    </div>
  );
}
