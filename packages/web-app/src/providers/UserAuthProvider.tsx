import React, { createContext, useCallback, useEffect, useState } from 'react';

import { auth } from '../utils/firebase-client';
import log, { Logger } from '../utils/log';
import { UserAuth } from './declarations/interfaces';

interface UserAuthContextShape {
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
} as UserAuthContextShape);

export default function UserAuthProvider({ children }: Props) {
  const [user, setUser] = useState(
    UserAuthStatus.Pending as UserAuth | UserAuthStatus
  );
  //   const [userRole, setUserRole] = useState(null as UserRole | null);

  const userIsSignedOut = user === UserAuthStatus.SignedOut;

  // on mount, add auth state listener
  useEffect(() => {
    // return unsubscribe function
    return auth.onAuthStateChanged((userAuth) => {
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

      // todo move role logic to separate provider
      /*
      const lastRole = getUserLocalStorageItem({
        uid: userAuth.uid,
        key: ROLE_LOCAL_STORAGE_KEY,
      }) as UserRole;

      log("UserProvider", `Loaded last role from local storage "${lastRole}"`);
      */
    });
  }, []);

  // todo move role logic to separate provider
  /*
  const updateUserRole = useCallback(
    (role: UserRole) => {
      // if user is not signed in
      if (typeof user !== "object")
        return logger.warn(
          "Could not update user role because user data is not confirmed as signed in"
        );

      // save role change to local storage
      setUserLocalStorageItem({
        uid: user?.uid || "UNDEFINED-",
        key: ROLE_LOCAL_STORAGE_KEY,
        value: role,
      });

      log(__filename, `Setting user role to ${role}`, {
        oldRole: role,
        newRole: role,
      });

      setUserRole(role);
    },
    [user]
  );
*/
  /*
  // restore a previous role if there is one
  if (!userRole && typeof user === "object") {
    const storedRole = getUserLocalStorageItem({
      key: ROLE_LOCAL_STORAGE_KEY,
      uid: user?.uid || "UNDEFINED-",
    }) as UserRole | null;

    if (storedRole) setUserRole(storedRole);
  }
*/
  return (
    <UserContext.Provider value={{ user, userIsSignedOut }}>
      {children}
    </UserContext.Provider>
  );
}
