import React, { createContext, useEffect, useState } from 'react';
import { ROLE_LOCAL_STORAGE_KEY } from 'src/constants';
import { UserAuth } from 'src/declarations/interfaces';
import { UserRole } from 'src/declarations/types';
import { getUserLocalStorageItem, setUserLocalStorageItem } from 'src/utils/userLocalStorage';

import { auth } from '../utils/firebase-client';

interface UserContextShape {
  user: UserAuth;

  setUserRole(role: UserRole): void;
}

interface Props {
  children: React.ReactNode;
}

export const UserContext = createContext({
  user: null,
  setUserRole: null,
} as UserContextShape);

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState(null as UserAuth | null);
  const [roleState, setRole] = useState(null as string);

  // on mount, add auth state listener
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      console.log(__filename, `User state changed to:`, { userAuth });

      const lastRole = getUserLocalStorageItem({
        uid: userAuth.uid,
        key: ROLE_LOCAL_STORAGE_KEY,
      }) as UserRole;

      setUser({
        ...userAuth,
        role: lastRole,
      });
    });
  }, []);

  const setUserRole = (role: UserRole) => {
    const newUser = { ...user, role };
    setUserLocalStorageItem({
      uid: user.uid,
      key: ROLE_LOCAL_STORAGE_KEY,
      value: role,
    });
    console.log(__filename, `Setting user role to ${role}`, {
      newUser,
      newRole: newUser.role,
    });
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
}
