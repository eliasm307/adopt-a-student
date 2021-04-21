import React from 'react';
import useAuthData from 'src/hooks/useAuthData';

// todo shows public data

// ! shows private data

const Overview = () => {
  const user = useAuthData();

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

export default Overview;
