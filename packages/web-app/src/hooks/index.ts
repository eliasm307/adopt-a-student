/* eslint-disable import/prefer-default-export */
import { useContext } from "react";
import { UserAuthStatus, UserContext } from "src/providers/UserAuthProvider";

import { UserRole } from "../declarations/types";
import { UserAuth } from "../providers/declarations/interfaces";

// todo co-locate context hooks with providers, ie in the same file?
export function useAuthData(): {
  user: UserAuth | UserAuthStatus;
  userIsSignedOut: boolean;
  setUser: (newUser: UserAuth | UserAuthStatus) => void;
} {
  const { setUser, user, userIsSignedOut } = useContext(UserContext);
  return { user, userIsSignedOut, setUser };
}
