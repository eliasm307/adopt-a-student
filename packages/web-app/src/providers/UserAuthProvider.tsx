import React, { createContext, useEffect, useState } from 'react';
import { ROLE_LOCAL_STORAGE_KEY } from 'src/constants';
import { UserRole } from 'src/declarations/types';
import { getUserLocalStorageItem, setUserLocalStorageItem } from 'src/utils/userLocalStorage';

import { auth } from '../utils/firebase-client';
import log from '../utils/log';
import { UserAuth } from './declarations/interfaces';

// todo move role logic to separate provider
interface UserAuthContextShape {
  updateUserRole: (role: UserRole) => void;
  user: UserAuth | null;
  userRole: UserRole | null;
}

interface Props {
  children: React.ReactNode;
}

// initial context
export const UserContext = createContext({
  updateUserRole: () => {
    throw Error("setUserRole is undefined");
  },
  user: null,
  userRole: null,
} as UserAuthContextShape);

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState(null as UserAuth | null);
  const [userRole, setUserRole] = useState(null as UserRole | null);

  // on mount, add auth state listener
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      log(__filename, `User state changed to:`, { userAuth });

      if (!userAuth) return console.warn("Signed out", { userAuth });

      const lastRole = getUserLocalStorageItem({
        uid: userAuth.uid,
        key: ROLE_LOCAL_STORAGE_KEY,
      }) as UserRole;

      log("UserProvider", `Loaded last role from local storage "${lastRole}"`);

      setUser({
        ...userAuth,
      });
    });
  }, []);

  const updateUserRole = (role: UserRole) => {
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
  };

  // restore a previous role if there is one
  if (!userRole) {
    const storedRole = getUserLocalStorageItem({
      key: ROLE_LOCAL_STORAGE_KEY,
      uid: user?.uid || "UNDEFINED-",
    }) as UserRole | null;

    if (storedRole) setUserRole(storedRole);
  }

  return (
    <UserContext.Provider value={{ user, updateUserRole, userRole }}>
      {children}
    </UserContext.Provider>
  );
}
