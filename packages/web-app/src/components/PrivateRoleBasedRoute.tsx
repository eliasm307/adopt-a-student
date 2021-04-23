import { navigate } from 'gatsby';
import React from 'react';
import { RoutePath } from 'src/constants';
import useAuthData from 'src/hooks/useAuthData';

import { RouteComponentProps } from '@reach/router';

import { BaseRouteProps } from '../declarations/interfaces';
import NavBar from './NavBar';

interface Props extends RouteComponentProps, BaseRouteProps {
  StudentComponent: React.ComponentType<any>;
  TutorComponent: React.ComponentType<any>;
}

const PrivateRoleBasedRoute = ({
  StudentComponent,
  TutorComponent,
  location,
  links,
  title,
  ...rest
}: Props) => {
  const user = useAuthData();

  // && location?.pathname !== RoutePath.login
  if (!user) {
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

  return (
    <>
      <NavBar links={links} title={title} /> <Component {...rest} />
    </>
  );
};

export default PrivateRoleBasedRoute;
