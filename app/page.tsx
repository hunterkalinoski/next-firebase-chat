"use client";

import MessageFeed from "@components/MessageFeed";
import SendChatButton from "@components/SendChatButton";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-8 bg-slate-700 pt-8">
      <MessageFeed />
      <section className="flex w-5/6 items-center justify-center gap-8">
        <textarea className="h-32 w-full" />
        <SendChatButton />
      </section>
    </main>
  );
}
