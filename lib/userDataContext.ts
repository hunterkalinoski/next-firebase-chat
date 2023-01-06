import { createContext } from "react";

// context to store information from the users firestore document
export const UserDataContext = createContext({ uid: "", email: "", username: "" });
