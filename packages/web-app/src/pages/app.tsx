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
          <div>Role {user?.role}</div>
          <Router>
            <PublicRoute default component={NotFound} />
            <PublicRoute path={RoutePath.login} component={SignIn} />
            <PrivateRoute path={RoutePath.roleSelect} component={RoleSelect} />
            <Redirect from='/app' to={RoutePath.login} noThrow />
            <PrivateRoleBasedRoute
              path={RoutePath.home}
              StudentComponent={StudentHome}
              TutorComponent={TutorHome}
            />
            <PrivateRoleBasedRoute
              path={RoutePath.profile}
              StudentComponent={StudentProfile}
              TutorComponent={TutorProfile}
            />
            <PrivateRoute
              path={`${RoutePath.studentOverview}/:studentId`}
              component={StudentOverview}
            />
            <PrivateRoute
              path={`${RoutePath.tutorOverview}/:tutorId`}
              component={TutorOverview}
            />
            <PrivateRoleRoute
              path={RoutePath.signUp}
              StudentComponent={StudentSignUp}
              TutorComponent={TutorSignUp}
            />
          </Router>
        </Layout>
      </QueryClientProvider>
    </UserProvider>
  );
};

export default App;
