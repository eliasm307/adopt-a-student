// ? should layout be inside each route to display relevant links

import log from '../../utils/log';

const StudentApp = () => {
  log(__filename, "render");
  /*
  return (
    <Layout>
      <div>Student App</div>
      <Router>
        <Redirect default to='/role' />
        <Route path='/role' component={RoleSelect} />
        <Route path='/home' component={StudentHome} />
        <Route path='/profile' component={StudentProfile} />
        <Route path='/overview/:studentId' component={StudentOverview} />
        <Route path='/sign-up' component={StudentSignUp} />
      </Router>
    </Layout>
  );
  */
};

export default StudentApp;
