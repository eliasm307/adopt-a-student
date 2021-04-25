import { navigate } from 'gatsby';
import React from 'react';
import { RoutePath } from 'src/constants';
import { useAuthData } from 'src/hooks';

import { RouteComponentProps } from '@reach/router';

import { BaseRouteProps } from '../declarations/interfaces';
import log from '../utils/log';
import NavBar from './NavBar';

interface Props extends BaseRouteProps, RouteComponentProps {
  component: any;
}

const Route = ({
  component: Component,
  location,
  navbarLinks: links,
  title,
  isPublic,
  ...restProps
}: Props) => {
  const user = useAuthData();

  if (!isPublic && !user) {
    log("PrivateRoute", `Not signed in, redirecting to "${RoutePath.SignIn}"`);
    navigate(RoutePath.SignIn);
    return null;
  }
  return (
    <>
      <NavBar links={links} title={title} /> <Component {...restProps} />
    </>
  );
};

export default Route;
