import React, { createContext, useEffect, useState } from 'react';
import { UserAuth } from 'src/declarations/interfaces';
import { UserRole } from 'src/declarations/types';

import { auth } from '../utils/firebase-client';

interface UserContext {
  user: UserAuth;

  setUserRole(role: UserRole): void;
}

interface Props {
  children: React.ReactChildren;
}

export const UserContext = createContext(null as UserContext | null);

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState(null as UserAuth | null);

  // on mount, add auth state listener
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      console.log(`User state changed to:`, { userAuth });

      setUser(userAuth);
    });
  }, []);

  const setUserRole = (role: UserRole) => setUser({ ...user, role });

  return (
    <UserContext.Provider value={{ user, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
}
