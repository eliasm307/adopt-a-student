import { navigate } from 'gatsby';
import React from 'react';

import { RoutePath } from '../../constants';
import { useAuthData } from '../../hooks';

// todo shows public data

// ! shows private data

const StudentOverview = () => {
  const { user, userIsSignedOut } = useAuthData();

  // todo pass auth as state to routes https://reach.tech/router/api/navigate
  if (userIsSignedOut) {
    navigate(RoutePath.SignIn);
    return null;
  }

  return (
    <>
      <h1>student overview</h1>
    </>
  );
};

export default StudentOverview;
