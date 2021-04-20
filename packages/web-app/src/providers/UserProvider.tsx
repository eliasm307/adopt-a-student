import { auth, FireBaseUser } from 'firebase-utils';

import { BasicResponseData } from '@adopt-a-student/common';

export const UserContext = createContext(null as FireBaseUser | null);

const data: BasicResponseData;

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
