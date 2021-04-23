import { navigate } from 'gatsby';
import React from 'react';
import { RoutePath } from 'src/constants';
import useAuthData from 'src/hooks/useAuthData';

import { RouteComponentProps } from '@reach/router';

import NavBar from './NavBar';

const PrivateRoute = ({
  component: Component,
  location,
  ...restProps
}: RouteComponentProps<any>) => {
  const user = useAuthData();

  if (!user && location?.pathname !== RoutePath.login) {
    console.log(
      "PrivateRoute",
      `Not signed in, redirecting to "${RoutePath.login}"`
    );
    navigate(RoutePath.login);
    return null;
  }
  return (
    <>
      <NavBar /> <Component {...restProps} />
    </>
  );
};

export default PrivateRoute;
