import React, { createContext, useEffect, useState } from 'react';
import { ROLE_LOCAL_STORAGE_KEY } from 'src/constants';
import { UserRole } from 'src/declarations/types';
import { getUserLocalStorageItem, setUserLocalStorageItem } from 'src/utils/userLocalStorage';

import { auth } from '../utils/firebase-client';
import { UserAuth } from './declarations/interfaces';

interface UserContextShape {
  setUserRole: (role: UserRole) => void;
  user: UserAuth | null;
  userRole: UserRole | null;
}

interface Props {
  children: React.ReactNode;
}

// initial context
export const UserContext = createContext({
  setUserRole: () => {
    throw Error("setUserRole is undefined");
  },
  user: null,
  userRole: null,
} as UserContextShape);

export default function UserProvider({ children }: Props) {
  const [userState, setUserState] = useState(null as UserAuth | null);
  const [userRoleState, setRoleState] = useState(null as UserRole | null);

  // on mount, add auth state listener
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      console.log(__filename, `User state changed to:`, { userAuth });

      if (!userAuth) return console.warn("Signed out", { userAuth });

      const lastRole = getUserLocalStorageItem({
        uid: userAuth.uid,
        key: ROLE_LOCAL_STORAGE_KEY,
      }) as UserRole;

      console.log(
        "UserProvider",
        `Loaded last role from local storage "${lastRole}"`
      );

      setUserState({
        ...userAuth,
      });
    });
  }, []);

  const setUserRole = (role: UserRole) => {
    /*
    if (!user)
      return console.warn(
        "UserProvide",
        "Could not set role on user not signed in"
      );
      */

    // const newUser = { ...user, role };

    // save role change to local storage
    setUserLocalStorageItem({
      uid: userState?.uid || "UNDEFINED-",
      key: ROLE_LOCAL_STORAGE_KEY,
      value: role,
    });

    console.log(__filename, `Setting user role to ${role}`, {
      oldRole: userRoleState,
      newRole: role,
    });

    setRoleState(role);
    /*
    setUser(newUser);
    */
  };

  // restore a previous role if there is one
  if (!userRoleState) {
    const storedRole = getUserLocalStorageItem({
      key: ROLE_LOCAL_STORAGE_KEY,
      uid: userState?.uid || "UNDEFINED-",
    }) as UserRole | null;

    if (storedRole) setRoleState(storedRole);
  }

  return (
    <UserContext.Provider
      value={{ user: userState, setUserRole, userRole: userRoleState }}
    >
      {children}
    </UserContext.Provider>
  );
}
