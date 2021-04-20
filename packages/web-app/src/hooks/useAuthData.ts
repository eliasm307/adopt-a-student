import { useContext } from 'react';
import { UserContext } from 'src/providers/UserProvider';

const useAuthData = () => {
  return useContext(UserContext).user;
};

export default useAuthData;
