import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { QueryClientProvider } from "react-query";

import { Redirect, Router } from "@reach/router";

import SignIn from "../client-routes/general/sign-in";
import StudentHome from "../client-routes/student/home";
import StudentOverview from "../client-routes/student/overview";
import StudentProfile from "../client-routes/student/profile";
import StudentSignUp from "../client-routes/student/sign-up";
import TutorHome from "../client-routes/tutor/home";
import TutorOverview from "../client-routes/tutor/overview";
import TutorSignUp from "../client-routes/tutor/sign-up";
import TutorProfile from "../client-routes/tutor/tutor-profile";
import HomeNavBarLinks from "../components/NavBar/routeItems/home";
import ProfileNavbarLinks from "../components/NavBar/routeItems/profile";
import SignInNavBarLinks from "../components/NavBar/routeItems/sign-in";
import SignUpNavBarLinks from "../components/NavBar/routeItems/sign-up";
import StudentOverviewNavBarLinks from "../components/NavBar/routeItems/student-overview";
import TutorOverviewNavBarLinks from "../components/NavBar/routeItems/tutor-overview";
import RoleBasedRoute from "../components/RoleBasedRoute";
import Route from "../components/Route";
import { RoutePath } from "../constants";
import AppLayout from "../layouts/AppLayout";
// eslint-disable-next-line import/no-useless-path-segments
import NotFound from "../pages/404";
import UserPrivateStudentDataProvider from "../providers/PrivateStudentDataProvider";
// import UserStudentDataProvider from '../providers/PrivateStudentDataProvider';
import UserAuthProvider from "../providers/UserAuthProvider";
import UserRoleProvider from "../providers/UserRoleProvider";
import { queryClient } from "../utils/reactQuery";

// ? split routing and provider specification? ie have a high level app with the providers then that wraps the app with the routes

// todo rewrite routing as a state machine for a more robust system

/** Responsilbe for defining the routes for the app and providers */
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserAuthProvider>
        <UserRoleProvider>
          <UserPrivateStudentDataProvider>
            <AppLayout>
              <Router id='router'>
                <Route
                  isPublic
                  default
                  component={NotFound}
                  title='Not found'
                />
                <Redirect from={RoutePath.App} to={RoutePath.Home} noThrow />
                <Route
                  isPublic
                  path={RoutePath.SignIn}
                  component={SignIn}
                  title='Sign-In'
                  navbarLinks={SignInNavBarLinks}
                />
                <RoleBasedRoute
                  requiresUserData
                  isPublic={false}
                  path={RoutePath.Home}
                  StudentComponent={StudentHome}
                  TutorComponent={TutorHome}
                  title='Home'
                  navbarLinks={HomeNavBarLinks}
                />
                <RoleBasedRoute
                  requiresUserData={false}
                  isPublic={false}
                  path={RoutePath.Profile}
                  StudentComponent={StudentProfile}
                  TutorComponent={TutorProfile}
                  title='My Profile'
                  navbarLinks={ProfileNavbarLinks}
                />
                <Route
                  isPublic={false}
                  path={`${RoutePath.StudentOverview}/:studentId`}
                  component={StudentOverview}
                  title='Student Overview'
                  navbarLinks={StudentOverviewNavBarLinks}
                />
                <Route
                  isPublic={false}
                  path={`${RoutePath.TutorOverview}/:tutorId`}
                  component={TutorOverview}
                  title='Tutor Overview'
                  navbarLinks={TutorOverviewNavBarLinks}
                />
                <RoleBasedRoute
                  requiresUserData={false}
                  isPublic
                  path={RoutePath.SignUp}
                  StudentComponent={StudentSignUp}
                  TutorComponent={TutorSignUp}
                  title='Sign-Up'
                  navbarLinks={SignUpNavBarLinks}
                />
              </Router>
            </AppLayout>
          </UserPrivateStudentDataProvider>
        </UserRoleProvider>
      </UserAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
