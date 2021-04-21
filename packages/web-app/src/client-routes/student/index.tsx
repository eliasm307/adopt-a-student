import React from 'react';
import PrivateRoute from 'src/components/PrivateRoute';
import PublicRoute from 'src/components/PublicRoute';
import Layout from 'src/layouts/DefaultLayout';

import { Router } from '@reach/router';

import Login from '../general/sign-in';
import Home from './home';
import Overview from './overview';
import Profile from './profile';
import SignUp from './sign-up';

// ? should layout be inside each route to display relevant links

const StudentApp = () => (
  <Layout>
    <div>Student App</div>
    <Router>
      <PrivateRoute path='/' component={Home} />
      <PrivateRoute path='/profile' component={Profile} />
      <PrivateRoute path='/overview/:studentId' component={Overview} />
      <PrivateRoute path='/sign-up' component={SignUp} />
    </Router>
  </Layout>
);

export default StudentApp;
