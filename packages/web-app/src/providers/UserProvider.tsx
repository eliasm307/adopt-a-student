import React, { createContext, useEffect, useState } from 'react';
import { UserAuth } from 'src/declarations/interfaces';
import { UserRole } from 'src/declarations/types';

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

      setUser(userAuth);
    });
  }, []);

  const setUserRole = (role: UserRole) => {
    const newUser = { ...user, role };
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
