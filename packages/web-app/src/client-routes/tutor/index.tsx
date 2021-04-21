import React from 'react';
import PrivateRoute from 'src/components/PrivateRoute';
import PublicRoute from 'src/components/PublicRoute';
import Layout from 'src/layouts/DefaultLayout';

// ? should layout be inside each route to display relevant links

const TutorApp = () => (
  <Layout>
    <div>Tutor App</div>
  </Layout>
);

export default TutorApp;
