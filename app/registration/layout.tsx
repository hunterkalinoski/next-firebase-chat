"use client";

import { EmailPasswordContext } from "@lib/registrationContext";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flex flex-col items-center gap-4 pt-32">
        <div className="flex flex-row gap-4 md:gap-16">
          <label className="w-32 text-lg text-gray-200" htmlFor="emailInput">
            Email:
          </label>
          <input
            type="text"
            name="emailInput"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex flex-row gap-4 md:gap-16">
          <label className="w-32 text-lg text-gray-200" htmlFor="passwordInput">
            Password:
          </label>
          <input
            value={password}
            type="text"
            name="passwordInput"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      {/* context allows children page to read email and password values
          Nextjs does not provide a way to pass state from layout to children */}
      <EmailPasswordContext.Provider value={{ email, password }}>
        {children}
      </EmailPasswordContext.Provider>
    </>
  );
}
