import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Redirect, Router } from '@reach/router';

import SignIn from '../client-routes/general/sign-in';
import StudentHome from '../client-routes/student/home';
import StudentOverview from '../client-routes/student/overview';
import StudentProfile from '../client-routes/student/profile';
import StudentSignUp from '../client-routes/student/sign-up';
import TutorHome from '../client-routes/tutor/home';
import TutorOverview from '../client-routes/tutor/overview';
import TutorSignUp from '../client-routes/tutor/sign-up';
import TutorProfile from '../client-routes/tutor/tutor-profile';
import HomeNavBarLinks from '../components/NavBar/routeItems/home';
import ProfileNavbarLinks from '../components/NavBar/routeItems/profile';
import SignInNavBarLinks from '../components/NavBar/routeItems/sign-in';
import SignUpNavBarLinks from '../components/NavBar/routeItems/sign-up';
import StudentOverviewNavBarLinks from '../components/NavBar/routeItems/student-overview';
import TutorOverviewNavBarLinks from '../components/NavBar/routeItems/tutor-overview';
import RoleBasedRoute from '../components/RoleBasedRoute';
import Route from '../components/Route';
import { RoutePath } from '../constants';
import Layout from '../layouts/DefaultLayout';
// eslint-disable-next-line import/no-useless-path-segments
import NotFound from '../pages/404';
import UserProvider from '../providers/UserAuthProvider';
import UserStudentDataProvider from '../providers/UserStudentDataProvider';

const queryClient = new QueryClient();

// ? split routing and provider specification?
/** Responsilbe for defining the routes for the app and providers */
const App = () => {
  return (
    <UserProvider>
      <UserStudentDataProvider>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Router>
              <Route isPublic default component={NotFound} title='Not found' />
              <Redirect from='/app' to={RoutePath.Home} noThrow />
              <Route
                isPublic
                path={RoutePath.SignIn}
                component={SignIn}
                title='Sign-In'
                navbarLinks={SignInNavBarLinks}
              />
              <RoleBasedRoute
                isPublic={false}
                path={RoutePath.Home}
                StudentComponent={StudentHome}
                TutorComponent={TutorHome}
                title='Home'
                navbarLinks={HomeNavBarLinks}
              />
              <RoleBasedRoute
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
                isPublic
                path={RoutePath.SignUp}
                StudentComponent={StudentSignUp}
                TutorComponent={TutorSignUp}
                title='Sign-Up'
                navbarLinks={SignUpNavBarLinks}
              />
            </Router>
          </Layout>
        </QueryClientProvider>
      </UserStudentDataProvider>
    </UserProvider>
  );
};

export default App;
