import { useContext } from 'react';
import { UserAuth } from 'src/declarations/interfaces';
import { UserContext } from 'src/providers/UserProvider';

export default function useAuthData(): UserAuth | null {
  return useContext(UserContext)?.user;
}
