import React from 'react';
import RoleSelect from 'src/client-routes/general/role';
import StudentApp from 'src/client-routes/student';
import TutorApp from 'src/client-routes/tutor';
import PrivateRoleRoute from 'src/components/PrivateRoleRoute';
import useAuthData from 'src/hooks/useAuthData';

import { Router } from '@reach/router';

import Login from '../client-routes/general/sign-in';
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
  const UserApp =
    (user?.role === "Student" && (
      <PrivateRoleRoute path='/app' role='Student' component={StudentApp} />
    )) ||
    (user?.role === "Tutor" && (
      <PrivateRoleRoute path='/app' role='Student' component={TutorApp} />
    )) ||
    null;

  return (
    <Layout>
      <div>Role {user?.role}</div>
      <Router>
        <PublicRoute default component={NotFound} />
        <PublicRoute path='/app/login' component={Login} />
        <PrivateRoute path='/app/role' component={RoleSelect} />
        {UserApp}
      </Router>
    </Layout>
  );
};

export default App;
