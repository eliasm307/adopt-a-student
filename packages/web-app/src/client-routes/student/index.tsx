import React from 'react';
import PrivateRoute from 'src/components/PrivateRoute';
import Layout from 'src/layouts/DefaultLayout';

import { Redirect, Router } from '@reach/router';

import RoleSelect from '../general/role';
import StudentHome from './home';
import StudentOverview from './overview';
import StudentProfile from './profile';
import StudentSignUp from './sign-up';

// ? should layout be inside each route to display relevant links

const StudentApp = () => {
  console.log(__filename, "render");
  return (
    <Layout>
      <div>Student App</div>
      <Router>
        <Redirect default to='/role' />
        <PrivateRoute path='/role' component={RoleSelect} />
        <PrivateRoute path='/home' component={StudentHome} />
        <PrivateRoute path='/profile' component={StudentProfile} />
        <PrivateRoute path='/overview/:studentId' component={StudentOverview} />
        <PrivateRoute path='/sign-up' component={StudentSignUp} />
      </Router>
    </Layout>
  );
};

export default StudentApp;
