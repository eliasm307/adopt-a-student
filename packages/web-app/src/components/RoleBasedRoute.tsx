import { navigate } from 'gatsby';
import React from 'react';
import { RoutePath } from 'src/constants';
import { useAuthData, useUserRole } from 'src/hooks';

import { RouteComponentProps } from '@reach/router';

import { BaseRouteProps } from '../declarations/interfaces';
import { useUserPrivateStudentData } from '../providers/PrivateStudentDataProvider';
import NavBar from './NavBar';
import RoleSelector from './RoleSelector';
import StudentPreferencesForm from './StudentPreferencesForm';

interface Props extends RouteComponentProps, BaseRouteProps {
  StudentComponent: React.ComponentType<any>;
  TutorComponent: React.ComponentType<any>;
  requiresUserPreferencesSet: boolean;
}

const RoleBasedRoute = ({
  StudentComponent,
  TutorComponent,
  location,
  navbarLinks: links,
  title,
  requiresUserPreferencesSet,
  isPublic,
  ...rest
}: Props) => {
  const user = useAuthData();
  const userRole = useUserRole();
  const userPrivateStudentData = useUserPrivateStudentData();

  // check user is signed in, if route is not public
  if (!isPublic && !user) {
    console.warn(__filename, "not signed in, redirect to sign in");
    navigate(RoutePath.SignIn);
    return null;
  }
  // check if user has defined a role, otherwise make them select a role
  if (!userRole) {
    // ? should this be a modal window instead
    return <RoleSelector />;
  }

  const studentPreferencesDefined =
    userPrivateStudentData &&
    userPrivateStudentData?.prefferedCountries?.length &&
    userPrivateStudentData.prefferedLocales?.length;

  if (
    userRole === "Student" &&
    requiresUserPreferencesSet &&
    !studentPreferencesDefined
  ) {
    // ? should this be a modal window instead
    return <StudentPreferencesForm />;
  }

  // todo implement for tutor
  /*
  if (userRole === "Tutor" && requiresUserPreferencesSet) {
    // ? should this be a modal window instead
    return <StudentPreferencesForm />;
  }
  */

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
