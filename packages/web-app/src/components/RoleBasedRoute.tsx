import { navigate } from 'gatsby';
import React from 'react';
import { RoutePath } from 'src/constants';
import { useAuthData, useUserRole } from 'src/hooks';

import { RouteComponentProps } from '@reach/router';

import { BaseRouteProps } from '../declarations/interfaces';
import { useUserPrivateStudentData } from '../providers/PrivateStudentDataProvider';
import log, { Logger } from '../utils/log';
import NavBar from './NavBar';
import RoleSelector from './RoleSelector';
import StudentPreferencesForm from './StudentProfileSetupForm';

interface Props extends RouteComponentProps, BaseRouteProps {
  StudentComponent: React.ComponentType<any>;
  TutorComponent: React.ComponentType<any>;
  requiresUserPreferencesSet: boolean;
}

const logger = new Logger("RoleBasedRoute");

// todo this should just be a proxy for a base route

const RoleBasedRoute = ({
  StudentComponent,
  TutorComponent,
  location,
  navbarLinks: links,
  title,
  requiresUserPreferencesSet,
  isPublic,
  default: defaultProp,
  path,
  uri,
  ...rest
}: Props) => {
  const { user, userIsSignedOut } = useAuthData();
  const userRole = useUserRole();
  const userPrivateStudentData = useUserPrivateStudentData();

  logger.log("navigating to:", { title, location, uri, defaultProp, path });

  // check user is signed in, if route is not public
  if (!isPublic && userIsSignedOut) {
    // todo sometimes user data can be undefined as it loads, so users get redirected unecessarily? try making a hook that explicitly checks on auth state changed on mount and redirects if the auth state is null, see for example https://stackoverflow.com/a/61026772

    logger.warn("not signed in, redirect to sign in", {
      user,
      userIsSignedOut,
    });
    navigate(RoutePath.SignIn);
    return null;
  }
  // check if user has defined a role, otherwise make them select a role
  if (!userRole) {
    // ? should this be a modal window instead
    logger.warn("userRole not defined, showing role selector", { userRole });
    return <RoleSelector />;
  }

  const studentPreferencesDefined =
    userPrivateStudentData &&
    userPrivateStudentData?.prefferedCountries?.length &&
    userPrivateStudentData.prefferedLocales?.length;

  log("RoleBasedRoute", {
    studentPreferencesDefined,
    userPrivateStudentData,
  });

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
    <div style={{ position: "relative" }}>
      <div style={{ zIndex: 1 }}>
        <NavBar links={links} title={title} />
      </div>
      <div style={{ zIndex: 0 }}>
        <Component {...rest} />
      </div>
    </div>
  );
};

export default RoleBasedRoute;
