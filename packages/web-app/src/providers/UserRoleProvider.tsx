import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ROLE_LOCAL_STORAGE_KEY } from 'src/constants';
import { UserRole } from 'src/declarations/types';
import { getUserLocalStorageItem, setUserLocalStorageItem } from 'src/utils/userLocalStorage';

import { useAuthData } from '../hooks';
import { auth } from '../utils/firebase-client';
import log, { Logger } from '../utils/log';
import { UserAuth } from './declarations/interfaces';

interface UserRoleContextShape {
  updateUserRole: (role: UserRole) => void;
  userRole: UserRole | null;
}

interface Props {
  children: React.ReactNode;
}

const logger = new Logger("UserRoleProvider");

// initial context
export const UserRoleContext = createContext({
  updateUserRole: () => {
    throw Error("setUserRole is undefined");
  },
  userRole: null,
} as UserRoleContextShape);

export default function UserRoleProvider({ children }: Props) {
  const [userRole, setUserRole] = useState(null as UserRole | null);

  const { userIsSignedOut, user: user } = useAuthData();

  // const userIsSignedOut = !user;

  // on mount, add auth state listener
  useEffect(() => {
    if (typeof user !== "object") return;

    const lastRole = getUserLocalStorageItem({
      uid: user.uid,
      key: ROLE_LOCAL_STORAGE_KEY,
    }) as UserRole;

    log("UserProvider", `Loaded last role from local storage "${lastRole}"`);
  }, [user]);

  // todo move role logic to separate provider
  const updateUserRole = useCallback(
    (role: UserRole) => {
      // if user is not signed in
      if (typeof user !== "object")
        return logger.warn(
          "Could not update user role because user is not confirmed as signed in"
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

  // restore a previous role if there is one
  if (!userRole && typeof user === "object") {
    const storedRole = getUserLocalStorageItem({
      key: ROLE_LOCAL_STORAGE_KEY,
      uid: user?.uid || "UNDEFINED-",
    }) as UserRole | null;

    if (storedRole) setUserRole(storedRole);
  }

  return (
    <UserRoleContext.Provider value={{ userRole, updateUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}
