import { useContext } from 'react';
import { UserContext } from 'src/providers/UserProvider';

import { UserRole } from '../declarations/types';
import { UserAuth } from '../providers/declarations/interfaces';

export function useAuthData(): UserAuth | null {
  return useContext(UserContext)?.user;
}

export function useUserRole(): UserRole | null {
  return useContext(UserContext)?.userRole;
}
