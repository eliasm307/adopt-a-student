import { ComponentChildren, createContext } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { auth, FireBaseUser } from '@quirk-a-bot/firebase-utils';

export const UserContext = createContext(null as FireBaseUser | null);

interface Props {
  children: ComponentChildren;
}

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState(null as FireBaseUser | null);

  // on mount, add auth state listener
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      console.log(`User state changed to:`, { userAuth });
      setUser(userAuth);
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
