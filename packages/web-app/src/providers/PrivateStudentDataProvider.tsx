import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import {
  GetStudentRequestBody, GetStudentResponseBody, isPrivateStudentData, PrivateStudentData,
} from '@adopt-a-student/common';

import { QueryName } from '../constants';
import { useAuthData } from '../hooks';
import { functionsClient } from '../utils/firebase-client';
import callFirebaseFunction from '../utils/firebase-client/callFirebaseFunction';
import log, { Logger } from '../utils/log';
import { queryClient } from '../utils/reactQuery';

interface PrivateStudentHookReturn {
  refreshPrivateStudentData: (data: PrivateStudentData) => void;
  setUserPrivateStudentData: (data: PrivateStudentData | null) => void;
  userPrivateStudentData: PrivateStudentData | null;
}

interface ProviderProps {
  children: React.ReactNode;
}

const logger = new Logger("UserPrivateDataProvider");

// initial context
const UserPrivateDataContext = createContext({
  userPrivateStudentData: null,
} as { userPrivateStudentData: PrivateStudentData | null; setUserPrivateStudentData: (data: PrivateStudentData | null) => void });

// quick hook to get data
/*
export function useUserPrivateStudentData(): PrivateStudentData | null {
  return useContext(UserPrivateDataContext).userPrivateStudentData;
}
*/
// todo save some auth details to localstorage to maintain state between refreshes

export function usePrivateStudentData(): PrivateStudentHookReturn {
  const { user } = useAuthData();

  /*
  const [userPrivateStudentData, setUserPrivateStudentData] = useState(
    null as PrivateStudentData | null
  );
  */

  // state variable used to force a data refetch
  const [lastDataRequest, setLastDataRequest] = useState<number>(
    new Date().getTime()
  );

  // store state on a high level
  const { setUserPrivateStudentData, userPrivateStudentData } = useContext(
    UserPrivateDataContext
  );

  useEffect(() => {
    const task = async () => {
      if (typeof user !== "object")
        return logger.warn(
          "Could not query student data because there is no user data"
        );
      logger.log("starting query for student data");
      try {
        const data = await callFirebaseFunction<
          GetStudentRequestBody,
          GetStudentResponseBody
        >({
          name: "getStudent",
          data: { id: user?.uid || "" },
          functions: functionsClient,
        });
        logger.log(`query successful`, { data });

        if (!data) {
          logger.error("No data returned");
          return setUserPrivateStudentData(null);
        }

        if (!isPrivateStudentData(data?.student)) {
          logger.error("Student data was not private student data");
          return setUserPrivateStudentData(null);
        }

        setUserPrivateStudentData(data.student);
      } catch (error) {
        logger.error({ error });
      }
    };
    task();
  }, [user, lastDataRequest, setUserPrivateStudentData]); // if lastDataRequest is changed this should force a data refresh

  const refreshPrivateStudentData = useCallback(() => {
    // queryClient.invalidateQueries(queryName);
    // ? is this required? will this cause flashing?
    // setUserPrivateStudentData(null);
    setLastDataRequest(new Date().getTime());
  }, []);

  return {
    refreshPrivateStudentData,
    userPrivateStudentData,
    setUserPrivateStudentData,
  };
}

export default function UserPrivateStudentDataProvider({
  children,
}: ProviderProps) {
  const [userPrivateStudentDataState, setUserPrivateStudentData] = useState(
    null as PrivateStudentData | null
  );

  return (
    <UserPrivateDataContext.Provider
      value={{
        userPrivateStudentData: userPrivateStudentDataState,
        setUserPrivateStudentData,
      }}
    >
      {children}
    </UserPrivateDataContext.Provider>
  );
}

/*

export default function UserPrivateStudentDataProvider({
  children,
}: ProviderProps) {
  const queryName = QueryName.UserPrivateStudentData;
  const { user } = useAuthData();

  const [userPrivateStudentDataState, setUserPrivateStudentData] = useState(
    null as PrivateStudentData | null
  );

  // state variable used to force a data refetch
  const [lastDataRequest, setLastDataRequest] = useState<number>(
    new Date().getTime()
  );

  // ? might be better to have a use effect that calls the query conditionally depending on if it is defined, then include a refresh button or something

  useEffect(() => {
    const task = async () => {
      if (typeof user !== "object")
        return logger.warn(
          "Could not query student data because there is no user data"
        );
      logger.log("starting query for student data");
      try {
        const data = await callFirebaseFunction<
          GetStudentRequestBody,
          GetStudentResponseBody
        >({
          name: "getStudent",
          data: { id: user?.uid || "" },
          functions: functionsClient,
        });
        logger.log(`query successful`, { data });

        if (!data) {
          logger.error("No data returned");
          return setUserPrivateStudentData(null);
        }

        if (!isPrivateStudentData(data?.student)) {
          logger.error("Student data was not private student data");
          return setUserPrivateStudentData(null);
        }

        setUserPrivateStudentData(data.student);
      } catch (error) {
        logger.error({ error });
      }
    };
    task();
  }, [user, lastDataRequest]); // if lastDataRequest is changed this should force a data refresh

  const refreshPrivateStudentData = useCallback(() => {
    // queryClient.invalidateQueries(queryName);
    // ? is this required? will this cause flashing?
    // setUserPrivateStudentData(null);
    setLastDataRequest(new Date().getTime());
  }, []);

  const updateUserPrivateStudentData = (
    newPrivateData: PrivateStudentData | null
  ) => {
    logger.log(`Updating user Private Student data...`, {
      currentPrivateData: userPrivateStudentDataState,
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
*/
