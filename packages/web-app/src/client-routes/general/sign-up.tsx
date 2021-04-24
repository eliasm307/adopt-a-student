// users select which role and hence which app they want to use

import React from 'react';
import useAuthData from 'src/hooks/useAuthData';

const SignUp = () => {
  const user = useAuthData();

  return (
    <>
      <h1>Sign up</h1>
    </>
  );
};

export default SignUp;
