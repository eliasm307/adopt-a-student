import React from 'react';

import { Router } from '@reach/router';

import Login from '../client-routes/general/sign-in';
import Profile from '../client-routes/students/profile';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../layouts/DefaultLayout';

// todo add router switch to match exact paths
// todo add 404 page or 404 redirect to home?
// todo add a tutor app and user app which defines what routes are available to each

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path='/app/profile' component={Profile} />
      <PrivateRoute path='/app/login' component={Login} />
    </Router>
  </Layout>
);

export default App;
