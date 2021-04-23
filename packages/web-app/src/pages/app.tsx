import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Redirect, Router } from '@reach/router';

import RoleSelect from '../client-routes/general/role-select';
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
import RoleSelectNavBarLinks from '../components/NavBar/routeItems/role-select';
import SignInNavBarLinks from '../components/NavBar/routeItems/sign-in';
import SignUpNavBarLinks from '../components/NavBar/routeItems/sign-up';
import StudentOverviewNavBarLinks from '../components/NavBar/routeItems/student-overview';
import TutorOverviewNavBarLinks from '../components/NavBar/routeItems/tutor-overview';
import PrivateRoleBasedRoute from '../components/PrivateRoleBasedRoute';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import { RoutePath } from '../constants';
import useAuthData from '../hooks/useAuthData';
import Layout from '../layouts/DefaultLayout';
// eslint-disable-next-line import/no-useless-path-segments
import NotFound from '../pages/404';
import UserProvider from '../providers/UserProvider';

// todo add router switch to match exact paths
// todo add 404 page or 404 redirect to home?
// todo add a tutor app and user app which defines what routes are available to each

const queryClient = new QueryClient();

const App = () => {
  const user = useAuthData();

  // select the app to use based on the user
  /*
  const UserApp =
    (user?.role === "Student" && (
      <PrivateRoleRoute path='/app' role='Student' component={StudentApp} />
    )) ||
    (user?.role === "Tutor" && (
      <PrivateRoleRoute path='/app' role='Tutor' component={TutorApp} />
    )) ||
    null;
    */

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Router>
            <PublicRoute default component={NotFound} title='Not found' />
            <PublicRoute
              path={RoutePath.Login}
              component={SignIn}
              title='Sign-In'
              navbarLinks={SignInNavBarLinks}
            />
            <PrivateRoute
              path={RoutePath.RoleSelect}
              component={RoleSelect}
              title='Select a Role'
              navbarLinks={RoleSelectNavBarLinks}
            />
            <Redirect from='/app' to={RoutePath.Login} noThrow />
            <PrivateRoleBasedRoute
              path={RoutePath.Home}
              StudentComponent={StudentHome}
              TutorComponent={TutorHome}
              title='Home'
              navbarLinks={HomeNavBarLinks}
            />
            <PrivateRoleBasedRoute
              path={RoutePath.Profile}
              StudentComponent={StudentProfile}
              TutorComponent={TutorProfile}
              title='My Profile'
              navbarLinks={ProfileNavbarLinks}
            />
            <PrivateRoute
              path={`${RoutePath.StudentOverview}/:studentId`}
              component={StudentOverview}
              title='Student Overview'
              navbarLinks={StudentOverviewNavBarLinks}
            />
            <PrivateRoute
              path={`${RoutePath.TutorOverview}/:tutorId`}
              component={TutorOverview}
              title='Tutor Overview'
              navbarLinks={TutorOverviewNavBarLinks}
            />
            <PrivateRoleBasedRoute
              path={RoutePath.SignUp}
              StudentComponent={StudentSignUp}
              TutorComponent={TutorSignUp}
              title='Sign-Up'
              navbarLinks={SignUpNavBarLinks}
            />
          </Router>
        </Layout>
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
