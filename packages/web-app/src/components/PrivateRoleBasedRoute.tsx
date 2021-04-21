import { navigate } from 'gatsby';
import React from 'react';
import useAuthData from 'src/hooks/useAuthData';

import { RouteComponentProps } from '@reach/router';

import PrivateRoute from './PrivateRoute';

interface Props extends RouteComponentProps {
  StudentComponent: React.ComponentType<any>;
  TutorComponent: React.ComponentType<any>;
}

const PrivateRoleBasedRoute = ({
  StudentComponent,
  TutorComponent,
  location,
  ...rest
}: Props) => {
  const user = useAuthData();

  if (!user && location?.pathname !== `/app/sign-in`) {
    console.warn(__filename, "not signed in, redirect to sign in");
    navigate("/app/sign-in");
    return null;
  }
  const { role } = user;

  /*
  // this shouldnt be required if the right app is provided, but including it just incase
  if (user?.role !== role) {
    alert(`Only ${role}s can access this route`);
    console.log("PrivateRoleBasedRoute", "ro")
    navigate("/app/role");
    return null;
  }
  */

  const Component =
    (role === "Student" && StudentComponent) ||
    (role === "Tutor" && TutorComponent) ||
    (() => <div>Route not defined for {role} user role</div>);

  return <Component {...rest} />;
};

export default PrivateRoleBasedRoute;
