import { navigate } from 'gatsby';
import React from 'react';

import { RoutePath } from '../constants';
import isBrowser from '../utils/isBrowser';

export default function Home() {
  if (isBrowser()) navigate(RoutePath.SignIn);
  return null;
  /*
  if (user && typeof window !== "undefined") navigate("/app");
  return (
    <Layout>
      <h1>Hello {user ? user.displayName : "world"}!</h1>
      <p>
        {user ? (
          <>
            You are logged in, so check your <Link to='/app'>profile</Link>
          </>
        ) : (
          <>
            You should <Link to={RoutePath.SignIn}>log in</Link> to see
            restricted content
          </>
        )}
      </p>
    </Layout>
  );
  */
}
