"use client";

import MessageFeed from "@components/MessageFeed";
import { auth, firestore } from "@lib/firebase";
import { UserDataContext } from "@lib/userDataContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ColorRing } from "react-loader-spinner";

export default function Home() {
  const [authState] = useAuthState(auth);
  const [messageContent, setMessageContent] = useState("");
  const userData = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);

  const postMessage = async () => {
    // dont let user attempt to resend message before completion
    if (loading) {
      return;
    }
    setLoading(true);
    if (messageContent == "" || userData.uid == "") {
      alert("You cannot send blank messages!");
      setLoading(false);
      return;
    }
    // should not be able to call this function if authState is null, but check anyway
    if (!authState || userData.uid == "") {
      alert("failed to send message");
      setLoading(false);
      return;
    }
    await addDoc(collection(firestore, "messages"), {
      userId: userData.uid,
      createdAt: serverTimestamp(),
      author: userData.username,
      content: messageContent,
    });
    setMessageContent("");
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center gap-8 bg-slate-700 pt-8">
      <MessageFeed />
      <section className="flex w-5/6 items-center justify-center gap-8">
        <textarea
          className="h-32 w-full"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        {authState ? (
          <>
            <button onClick={postMessage}>
              <p>Send</p>
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
          </>
        ) : (
          <div className="p-0 text-center text-gray-200">Sign In to send messages!</div>
        )}
      </section>
    </main>
  );
}
