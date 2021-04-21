import { Link, navigate } from 'gatsby';
import React from 'react';
import useAuthData from 'src/hooks/useAuthData';

import Layout from '../layouts/DefaultLayout';

export default function Home() {
  const user = useAuthData();

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
            You should <Link to='/app/sign-in'>log in</Link> to see restricted
            content
          </>
        )}
      </p>
    </Layout>
  );
}
