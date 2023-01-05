"use client";

import Counter from "@components/Counter";
import { auth } from "@lib/firebase";
import { useEffect } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignOut,
} from "react-firebase-hooks/auth";

export default function Home() {
  const [authState, authLoading, authError] = useAuthState(auth);
  const [createUserWithEmailAndPassword, registeredUser, createLoading, createError] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword, loggedInUser, signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);

  useEffect(() => {
    console.log("authState:", authState);
    console.log("loading", authLoading);
    console.log("error", authError);
  }, [authState, authLoading, authError]);

  useEffect(() => {
    console.log("registeredUser:", registeredUser);
    console.log("createLoading:", createLoading);
    console.log("createError:", createError);
  }, [registeredUser, createLoading, createError]);

  useEffect(() => {
    console.log("loggedInUser: ", loggedInUser);
    console.log("signInLoading: ", signInLoading);
    console.log("signInError: ", signInError);
  }, [loggedInUser, signInLoading, signInError]);

  useEffect(() => {
    console.log("signOutLoading: ", signOutLoading);
    console.log("signOutError: ", signOutError);
  }, [signOutLoading, signOutError]);

  return (
    <main>
      <div className="bg-red-600">Hello new next project with firebase + tailwind + typescript</div>
      <Counter />
      <button
        onClick={() => createUserWithEmailAndPassword("test@gmail.com", "password")}
        className="border border-black rounded-lg bg-black bg-opacity-10 hover:bg-opacity-30 px-20 py-1"
      >
        Create Account
      </button>
      <button
        onClick={() => signInWithEmailAndPassword("test@gmail.com", "password")}
        className="border border-black rounded-lg bg-black bg-opacity-10 hover:bg-opacity-30 px-20 py-1"
      >
        Sign in
      </button>
      <button
        onClick={signOut}
        className="border border-black rounded-lg bg-black bg-opacity-10 hover:bg-opacity-30 px-20 py-1"
      >
        Sign Out
      </button>
      {authState ? <div>{"Signed in as: " + authState.uid}</div> : <div>Not signed in</div>}
    </main>
  );
}
