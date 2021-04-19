import React from 'react';

import { Router } from '@reach/router';

import Login from '../client-routes/login';
import Profile from '../client-routes/profile';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../layouts/DefaultLayout';

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path='/app/profile' component={Profile} />
      <PrivateRoute path='/app/login' component={Login} />
    </Router>
  </Layout>
);

export default App;
