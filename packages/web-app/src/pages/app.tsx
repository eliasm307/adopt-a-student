import React from 'react';
import RoleSelect from 'src/client-routes/general/role';
import SignIn from 'src/client-routes/general/sign-in';
import StudentHome from 'src/client-routes/student/home';
import StudentOverview from 'src/client-routes/student/overview';
import StudentSignUp from 'src/client-routes/student/sign-up';
import TutorHome from 'src/client-routes/tutor/home';
import TutorOverview from 'src/client-routes/tutor/overview';
import TutorSignUp from 'src/client-routes/tutor/sign-up';
import TutorProfile from 'src/client-routes/tutor/tutor-profile';
import PrivateRoleRoute from 'src/components/PrivateRoleBasedRoute';
import useAuthData from 'src/hooks/useAuthData';
import UserProvider from 'src/providers/UserProvider';

import { Redirect, Router } from '@reach/router';

import StudentProfile from '../client-routes/student/profile';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import Layout from '../layouts/DefaultLayout';
import NotFound from '../pages/404';

// todo add router switch to match exact paths
// todo add 404 page or 404 redirect to home?
// todo add a tutor app and user app which defines what routes are available to each

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
      <Layout>
        <div>Role {user?.role}</div>
        <Router>
          <PublicRoute default component={NotFound} />
          <PublicRoute path='/app/sign-in' component={SignIn} />
          <PrivateRoute path='/app/role' component={RoleSelect} />
          <Redirect from='/app' to='/app/sign-in' noThrow />
          <PrivateRoleRoute
            path='/app/home'
            StudentComponent={StudentHome}
            TutorComponent={TutorHome}
          />
          <PrivateRoleRoute
            path='/app/profile'
            StudentComponent={StudentProfile}
            TutorComponent={TutorProfile}
          />
          <PrivateRoute
            path='/app/student/:studentId'
            component={StudentOverview}
          />
          <PrivateRoute
            path='/app/tutor/:studentId'
            component={TutorOverview}
          />
          <PrivateRoleRoute
            path='/app/sign-up'
            StudentComponent={StudentSignUp}
            TutorComponent={TutorSignUp}
          />
        </Router>
      </Layout>
    </UserProvider>
  );
};

export default App;
