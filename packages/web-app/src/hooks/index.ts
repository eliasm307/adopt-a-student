import { useContext } from 'react';
import { UserContext } from 'src/providers/UserAuthProvider';

import { UserRole } from '../declarations/types';
import { UserAuth } from '../providers/declarations/interfaces';

// todo co-locate context hooks with providers, ie in the same file?
export function useAuthData(): UserAuth | null {
  return useContext(UserContext)?.user;
}

export function useUserRole(): UserRole | null {
  return useContext(UserContext)?.userRole;
}
