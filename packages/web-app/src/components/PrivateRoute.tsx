import { navigate } from 'gatsby';

const isLoggedIn = () => true;

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/login`) {
    navigate("/app/login");
    return null;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
