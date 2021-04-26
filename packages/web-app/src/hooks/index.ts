import { useContext } from 'react';
import { UserAuthStatus, UserContext } from 'src/providers/UserAuthProvider';

import { UserRole } from '../declarations/types';
import { UserAuth } from '../providers/declarations/interfaces';

// todo co-locate context hooks with providers, ie in the same file?
export function useAuthData(): {
  user: UserAuth | UserAuthStatus;
  userIsSignedOut: boolean;
} {
  const data = useContext(UserContext);
  return { user: data.user, userIsSignedOut: data.userIsSignedOut };
}

export function useUserRole(): UserRole | null {
  return useContext(UserContext)?.userRole;
}
