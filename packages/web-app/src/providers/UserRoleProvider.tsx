import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ROLE_LOCAL_STORAGE_KEY } from "src/constants";
import { UserRole } from "src/declarations/types";
import {
  getUserLocalStorageItem,
  setUserLocalStorageItem,
} from "src/utils/userLocalStorage";

import { useAuthData } from "../hooks";
import { auth } from "../utils/firebase-client";
import log, { Logger } from "../utils/log";
import { UserAuth } from "./declarations/interfaces";

interface UserRoleContextShape {
  updateUserRole: (role: UserRole) => void;
  userRole: UserRole | null;
}

interface Props {
  children: React.ReactNode;
}

const logger = new Logger("UserRoleProvider");

// initial context
export const UserRoleContext = createContext({
  updateUserRole: () => {
    throw Error("setUserRole is undefined");
  },
  userRole: null,
} as UserRoleContextShape);

export default function UserRoleProvider({ children }: Props) {
  const [userRole, setUserRole] = useState(null as UserRole | null);

  const { user } = useAuthData();

  logger.log({ userRole, typeofUser: typeof user });

  // restore a previous role for a user if there is one
  useEffect(() => {
    if (typeof user !== "object") return;

    const lastRole = getUserLocalStorageItem({
      uid: user.uid,
      key: ROLE_LOCAL_STORAGE_KEY,
    }) as UserRole;

    log("UserProvider", `Loaded last role from local storage "${lastRole}"`);

    if (lastRole) return setUserRole(lastRole);
    logger.warn("no last role found", { lastRole });
  }, [user]);

  const updateUserRole = useCallback(
    (role: UserRole) => {
      logger.log(`Updating user role to ${role}...`);
      // if user is signed in (unauthenticated users can select roles when signing up)
      if (typeof user === "object") {
        logger.log(
          "Setting role for signed in user and saving it to local storage"
        );

        // save role change to local storage
        setUserLocalStorageItem({
          uid: user.uid,
          key: ROLE_LOCAL_STORAGE_KEY,
          value: role,
        });
      }

      log(__filename, `Setting user role to ${role}`, {
        oldRole: role,
        newRole: role,
      });

      setUserRole(role);
    },
    [user]
  );

  /*
  // restore a previous role if there is one
  if (!userRole && typeof user === "object") {
    const storedRole = getUserLocalStorageItem({
      key: ROLE_LOCAL_STORAGE_KEY,
      uid: user?.uid || "UNDEFINED-",
    }) as UserRole | null;

    if (storedRole) setUserRole(storedRole);
  }
  */

  return (
    <UserRoleContext.Provider value={{ userRole, updateUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole(): UserRole | null {
  return useContext(UserRoleContext)?.userRole;
}
