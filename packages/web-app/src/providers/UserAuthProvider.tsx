import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { auth, FireBaseUser } from "../utils/firebase-client";
import log, { Logger } from "../utils/log";
import { UserAuth } from "./declarations/interfaces";

interface UserAuthContextShape {
  setUser: (user: UserAuth | UserAuthStatus) => void;
  user: UserAuth | UserAuthStatus;
  userIsSignedOut: boolean;
}
// todo save some auth details to localstorage to maintain state between refreshes

interface Props {
  children: React.ReactNode;
}

export enum UserAuthStatus {
  Pending = 1, // make sure any enum value is truthy, not to be confused with when data is null
  SignedOut = 0,
}

const logger = new Logger("UserAuthProvider");

// initial context
export const UserContext = createContext({
  user: UserAuthStatus.Pending,
  userIsSignedOut: false,
  setUser: () => {
    throw Error("Function not impemented");
  },
} as UserAuthContextShape);

export default function UserAuthProvider({ children }: Props) {
  const [user, setUser] = useState(
    UserAuthStatus.Pending as UserAuth | UserAuthStatus
  );
  //   const [userRole, setUserRole] = useState(null as UserRole | null);

  const userIsSignedOut = user === UserAuthStatus.SignedOut;

  useEffect(() => {
    if (userIsSignedOut) toast.info("Signed out", {});
  }, [userIsSignedOut]);

  useEffect(() => {
    if (typeof user === "object") toast.info("Signed in");
  }, [user]);

  // on mount, add auth state listener
  useEffect(() => {
    // return unsubscribe function
    return auth.onAuthStateChanged(
      (userAuth) => {
        log(__filename, `User state changed to:`, { userAuth });

        // if user auth is null this means signed out
        if (!userAuth) {
          console.warn("Signed out", { userAuth });
          return setUser(UserAuthStatus.SignedOut);
        }
        logger.log(`Signed in ${userAuth.uid}`);
        setUser(() => ({
          ...userAuth,
        }));
      },
      (error) => {
        logger.error("Couldnt sign in", { error });
        toast.error("Error signing in 😢");
        setUser(UserAuthStatus.SignedOut);
      }
    );
  }, []);

  return (
    <UserContext.Provider value={{ user, userIsSignedOut, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
