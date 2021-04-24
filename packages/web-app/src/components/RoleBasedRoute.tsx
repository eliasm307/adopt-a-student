import { navigate } from 'gatsby';
import React from 'react';
import { RoutePath } from 'src/constants';
import { useAuthData, useUserRole } from 'src/hooks';

import { RouteComponentProps } from '@reach/router';

import { BaseRouteProps } from '../declarations/interfaces';
import NavBar from './NavBar';
import RoleSelector from './RoleSelector';

interface Props extends RouteComponentProps, BaseRouteProps {
  StudentComponent: React.ComponentType<any>;
  TutorComponent: React.ComponentType<any>;

  // roleSelectRoute: RoutePath;
}

const RoleBasedRoute = ({
  StudentComponent,
  TutorComponent,
  location,
  navbarLinks: links,
  title,
  // roleSelectRoute = RoutePath.AppRoleSelect,
  isPublic,
  ...rest
}: Props) => {
  const user = useAuthData();
  const userRole = useUserRole();

  // check user is signed in, if route is not public
  if (!isPublic && !user) {
    console.warn(__filename, "not signed in, redirect to sign in");
    navigate(RoutePath.Login);
    return null;
  }
  // check if user has defined a role, otherwise make them select a role
  if (!userRole) {
    return <RoleSelector />;
  }

  /**/

  const Component =
    (userRole === "Student" && StudentComponent) ||
    (userRole === "Tutor" && TutorComponent) ||
    (() => <div>Route not defined for {userRole} user role</div>);

  return (
    <>
      <NavBar links={links} title={title} /> <Component {...rest} />
    </>
  );
};

export default RoleBasedRoute;
