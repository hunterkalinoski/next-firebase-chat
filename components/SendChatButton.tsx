"use client";
import { auth } from "@lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Page({}) {
  const [authState] = useAuthState(auth);

  return authState ? (
    <button>
      <p>Send</p>
    </button>
  ) : (
    <div className="p-0 text-center text-gray-200">Sign In to send messages!</div>
  );
}
