"use client";

import { auth, firestore } from "@lib/firebase";
import { UserDataContext } from "@lib/userDataContext";
import { collection, limit, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { ColorRing } from "react-loader-spinner";

export default function MessageFeed({}) {
  const [authState] = useAuthState(auth);
  const userData = useContext(UserDataContext);
  const bottomOfMessageFeed = useRef<null | HTMLDivElement>(null);

  const messagesQuery = query(
    collection(firestore, "messages"),
    orderBy("createdAt", "desc"),
    limit(10)
  );
  const [collectionSnapshot, loading, error] = useCollection(messagesQuery);

  useEffect(() => {
    bottomOfMessageFeed.current?.scrollIntoView();
  });

  const MessagesComponent = () => {
    if (collectionSnapshot) {
      return (
        <div className="flex h-[32rem] w-5/6 flex-col items-start gap-8 overflow-y-scroll rounded-lg border-8 border-solid border-slate-800 bg-slate-800 p-10 sm:h-[36rem]">
          {/* .slice(0).reverse() reverses array so newest message is last (can be put at bototm) */}
          {collectionSnapshot?.docs
            .slice(0)
            .reverse()
            .map((doc) =>
              authState && userData.uid === doc.data().userId ? (
                // messages that YOU sent (logged in user is the author)
                <div
                  className="flex max-w-[80%] flex-col items-end self-end rounded-lg bg-slate-700 p-4 pl-12 text-end text-gray-200"
                  key={doc.id}
                >
                  <h3 className="text-lg md:text-2xl">{doc.data().author}</h3>
                  <p className="text-sm md:text-base">{doc.data().content}</p>
                </div>
              ) : (
                // messages from other people
                <div
                  className="flex max-w-[80%] flex-col items-start rounded-lg bg-slate-700 p-4 pr-12 text-gray-200"
                  key={doc.id}
                >
                  <h3 className="text-lg md:text-2xl">{doc.data().author}</h3>
                  <p className="text-sm md:text-base">{doc.data().content}</p>
                </div>
              )
            )}
          <div ref={bottomOfMessageFeed}></div>
        </div>
      );
    } else {
      return (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#64748b", "#64748b", "#64748b", "#64748b", "#64748b"]}
        />
      );
    }
  };

  return <MessagesComponent />;
}
