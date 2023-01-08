"use client";

import { firestore } from "@lib/firebase";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

export default function MessageFeed({}) {
  const messagesQuery = query(
    collection(firestore, "messages"),
    orderBy("createdAt", "desc"),
    limit(10)
  );
  const [collectionSnapshot, loading, error] = useCollection(messagesQuery);

  const MessagesComponent = () => {
    if (collectionSnapshot) {
      return (
        <div className="flex max-h-[36rem] w-5/6 flex-col gap-4 overflow-y-scroll rounded-lg bg-slate-800 p-10">
          {collectionSnapshot?.docs.map((doc) => (
            <div className="w-4/5 rounded-lg bg-slate-700 p-4 text-gray-200" key={doc.id}>
              <h3 className=" place-items-start justify-self-end text-2xl">{doc.data().author}</h3>
              <p>{doc.data().content}</p>
            </div>
          ))}
        </div>
      );
    } else {
      return <div>No messages!</div>;
    }
  };

  return <MessagesComponent />;
}
