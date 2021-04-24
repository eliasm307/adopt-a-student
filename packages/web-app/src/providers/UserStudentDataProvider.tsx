import React, { createContext, useState } from 'react';

import { PrivateStudentData } from '@adopt-a-student/common';

interface StudentDataContextShape {
  updateUserStudentData: (data: PrivateStudentData) => void;
  userStudentData: PrivateStudentData | null;
}

interface Props {
  children: React.ReactNode;
}

// initial context
export const UserStudentDataContext = createContext({
  updateUserStudentData: () => {
    throw Error("setUserRole is undefined");
  },
  userStudentData: null,
} as StudentDataContextShape);

export default function UserStudentDataProvider({ children }: Props) {
  const [userStudentData, setUserStudentData] = useState(
    null as PrivateStudentData | null
  );

  const updateUserStudentData = (newStudentData: PrivateStudentData) => {
    console.log(__filename, `Updating user student data...`, {
      currentStudentData: userStudentData,
      newStudentData,
    });

    setUserStudentData(newStudentData);
  };

  return (
    <UserStudentDataContext.Provider
      value={{
        userStudentData,
        updateUserStudentData,
      }}
    >
      {children}
    </UserStudentDataContext.Provider>
  );
}
