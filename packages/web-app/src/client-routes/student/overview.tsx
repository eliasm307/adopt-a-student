import { navigate } from 'gatsby';
import React from 'react';

import { RoutePath } from '../../constants';
import { useAuthData } from '../../hooks';

// todo shows public data

// ! shows private data

const StudentOverview = () => {
  const user = useAuthData();

  if (!user) {
    navigate(RoutePath.SignIn);
    return null;
  }

  return (
    <>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {user.displayName}</li>
        <li>E-mail: {user.email}</li>
      </ul>
    </>
  );
};

export default StudentOverview;
