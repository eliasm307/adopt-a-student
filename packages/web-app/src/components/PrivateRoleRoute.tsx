import { navigate } from 'gatsby';
import React from 'react';
import { UserRole } from 'src/declarations/types';
import useAuthData from 'src/hooks/useAuthData';

import { RouteComponentProps } from '@reach/router';

const isLoggedIn = () => true;

interface Props extends RouteComponentProps {
  component: any;
  // todo find the correct type for this
  role: UserRole;
}

const PrivateRoleRoute = ({
  component: Component,
  location,
  role,
  ...rest
}: Props) => {
  const user = useAuthData();

  if (!isLoggedIn() && location?.pathname !== `/app/login`) {
    navigate("/app/login");
    return null;
  }

  // this shouldnt be required if the right app is provided, but including it just incase
  if (user.role !== role) {
    alert(`Only ${role}s can access this route`);
    navigate("/app/role");
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoleRoute;
