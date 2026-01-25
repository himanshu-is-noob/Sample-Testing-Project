"use client"
import { createContext } from "react";

export const UserDetailContext = createContext({
  user: null,       // default = no user
  setUser: () => {}, // safe dummy function
});
