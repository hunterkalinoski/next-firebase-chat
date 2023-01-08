"use client";

import { auth } from "@lib/firebase";
import { UserDataContext } from "@lib/userDataContext";
import Link from "next/link";
import { useContext } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

export default function Navbar({}) {
  const [authState] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  const userData = useContext(UserDataContext);

  return (
    <div className="flex flex-row items-center justify-between bg-slate-800 px-20 py-4">
      <Link href="/">
        <h2 className="text-2xl font-bold text-gray-200 hover:underline">Next-Firebase Chat</h2>
      </Link>
      {authState ? (
        <div className="flex flex-row items-center gap-10">
          <h2 className="text-gray-200">{userData.username}</h2>
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
    </div>
  );
}
