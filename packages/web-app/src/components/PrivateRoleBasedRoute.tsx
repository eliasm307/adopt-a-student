import { navigate } from 'gatsby';
import React from 'react';
import { RoutePath } from 'src/constants';
import useAuthData from 'src/hooks/useAuthData';

import { RouteComponentProps } from '@reach/router';

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

  if (!user && location?.pathname !== RoutePath.login) {
    console.warn(__filename, "not signed in, redirect to sign in");
    navigate(RoutePath.login);
    return null;
  }
  const { role } = user;

  // this shouldnt be required if the right app is provided, but including it just incase
  if (!user?.role) {
    alert(`Only ${role}s can access this route`);
    console.log("PrivateRoleBasedRoute", "ro");
    navigate(RoutePath.roleSelect);
    return null;
  }
  /**/

  const Component =
    (role === "Student" && StudentComponent) ||
    (role === "Tutor" && TutorComponent) ||
    (() => <div>Route not defined for {role} user role</div>);

  return <Component {...rest} />;
};

export default PrivateRoleBasedRoute;
