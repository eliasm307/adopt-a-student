import { navigate } from 'gatsby';
import React from 'react';
import useAuthData from 'src/hooks/useAuthData';

import { RouteComponentProps } from '@reach/router';

const PrivateRoute = ({
  component: Component,
  location,
  ...restProps
}: RouteComponentProps<any>) => {
  const user = useAuthData();

  if (!user && location?.pathname !== `/app/sign-in`) {
    console.log("PrivateRoute", "Not signed in, redirecting to /app/sign-in");
    navigate("/app/sign-in");
    return null;
  }

  return <Component {...restProps} />;
};

export default PrivateRoute;
