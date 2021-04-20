import React from 'react';
import StudentApp from 'src/client-routes/student';

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

const App = () => (
  <Layout>
    <Router>
      <PublicRoute default component={NotFound} />
      <PublicRoute path='/app/login' component={Login} />
      <PublicRoute path='/app/login' component={Login} />
      <PrivateRoute path='/app' component={StudentApp} />
    </Router>
  </Layout>
);

export default App;
