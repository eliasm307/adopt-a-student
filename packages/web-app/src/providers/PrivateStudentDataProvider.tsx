import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { PrivateStudentData } from '@adopt-a-student/common';

import { QueryName } from '../constants';
import { useGetPrivateStudentDataQuery } from '../hooks/reactQuery';
import log from '../utils/log';
import { queryClient } from '../utils/reactQuery';

interface PrivateStudentDataContextShape {
  refreshPrivateStudentData: (data: PrivateStudentData) => void;
  updateUserPrivateStudentData: (data: PrivateStudentData | null) => void;
  userPrivateStudentData: PrivateStudentData | null;
}

interface ProviderProps {
  children: React.ReactNode;
}

// initial context
export const UserPrivateDataContext = createContext({
  refreshPrivateStudentData: () => {
    throw Error("function is undefined");
  },
  updateUserPrivateStudentData: () => {
    throw Error("function is undefined");
  },
  userPrivateStudentData: null,
} as PrivateStudentDataContextShape);

// quick hook to get data
export function useUserPrivateStudentData(): PrivateStudentData | null {
  return useContext(UserPrivateDataContext).userPrivateStudentData;
}

export default function UserPrivateStudentDataProvider({
  children,
}: ProviderProps) {
  const queryName = QueryName.UserPrivateStudentData;

  const [userPrivateStudentDataState, setUserPrivateStudentData] = useState(
    null as PrivateStudentData | null
  );

  const userPrivateStudentData = useGetPrivateStudentDataQuery({
    queryName,
  });

  useEffect(() => {
    log("UserPrivateStudentDataProvider", "updating private user data", {
      userPrivateStudentData,
    });
    setUserPrivateStudentData(userPrivateStudentData);
  }, [userPrivateStudentData]);

  const refreshPrivateStudentData = useCallback(() => {
    queryClient.invalidateQueries(queryName);
    // ? is this required? will this cause flashing?
    setUserPrivateStudentData(null);
  }, [queryName]);

  const updateUserPrivateStudentData = (
    newPrivateData: PrivateStudentData | null
  ) => {
    log(__filename, `Updating user Private Student data...`, {
      currentPrivateData: userPrivateStudentData,
      newPrivateData,
    });

    setUserPrivateStudentData(newPrivateData);
  };

  return (
    <UserPrivateDataContext.Provider
      value={{
        userPrivateStudentData: userPrivateStudentDataState,
        refreshPrivateStudentData,
        updateUserPrivateStudentData,
      }}
    >
      {children}
    </UserPrivateDataContext.Provider>
  );
}
