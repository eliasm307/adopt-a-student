import { useContext } from 'react';
import { UserAuth } from 'src/declarations/interfaces';
import { UserContext } from 'src/providers/UserProvider';

const useAuthData = (): UserAuth | null => {
  return useContext(UserContext)?.user || null;
};

export default useAuthData;
