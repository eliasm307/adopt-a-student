import React, { createContext, useEffect, useState } from 'react';
import { UserAuth } from 'src/declarations/interfaces';

import { auth } from '../utils/firebase-client';

export const UserContext = createContext(null as UserAuth | null);

interface Props {
  children: React.ReactChildren;
}

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState(null as UserAuth | null);

  // on mount, add auth state listener
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      console.log(`User state changed to:`, { userAuth });

      setUser({ uid: userAuth.uid });
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
