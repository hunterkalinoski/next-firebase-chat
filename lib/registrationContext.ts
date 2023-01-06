import { createContext } from "react";

// context used by registration pages layout
// allows passing this data to children (signin and singup pages)
// which is otherwise not possible/supported by Nextjs
export const EmailPasswordContext = createContext({ email: "", password: "" });
