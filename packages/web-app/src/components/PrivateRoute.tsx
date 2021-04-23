import { navigate } from 'gatsby';
import React from 'react';
import { RoutePath } from 'src/constants';
import useAuthData from 'src/hooks/useAuthData';

import { RouteComponentProps } from '@reach/router';

import { BaseRouteProps } from '../declarations/interfaces';
import NavBar from './NavBar';

interface Props extends BaseRouteProps, RouteComponentProps {
  component: any;
}

const PrivateRoute = ({
  component: Component,
  location,
  links,
  title,
  ...restProps
}: Props) => {
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
      <NavBar links={links} title={title} /> <Component {...restProps} />
    </>
  );
};

export default PrivateRoute;
