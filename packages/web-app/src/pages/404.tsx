import React from 'react';

import Layout from '../layouts/DefaultLayout';

export default function Home() {
  return (
    <Layout>
      <p>Are you lost?</p>
      <p>
        Lets go back <a href='/app/home'>home</a>
      </p>
    </Layout>
  );
}
