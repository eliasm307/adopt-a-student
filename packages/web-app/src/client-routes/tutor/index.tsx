import React from 'react';
import PrivateRoute from 'src/components/PrivateRoute';
import PublicRoute from 'src/components/PublicRoute';
import Layout from 'src/layouts/DefaultLayout';

import { Router } from '@reach/router';

import Login from '../general/sign-in';

// ? should layout be inside each route to display relevant links

const TutorApp = () => (
  <Layout>
    <div>Tutor App</div>
    <Router></Router>
  </Layout>
);

export default TutorApp;
