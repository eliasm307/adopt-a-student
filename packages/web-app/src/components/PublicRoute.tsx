import React from 'react';

import { RouteComponentProps } from '@reach/router';

import NavBar from './NavBar';

const PublicRoute = ({
  component: Component,
  location,
  ...rest
}: RouteComponentProps<any>) => (
  <>
    <NavBar /> <Component {...rest} />
  </>
);

export default PublicRoute;
