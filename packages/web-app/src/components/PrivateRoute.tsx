import { navigate } from 'gatsby';
import React from 'react';

import { RouteComponentProps } from '@reach/router';

const isLoggedIn = () => true;

const PrivateRoute = ({
  component: Component,
  location,
  ...rest
}: RouteComponentProps<any>) => {
  if (!isLoggedIn() && location?.pathname !== `/app/login`) {
    navigate("/app/login");
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
