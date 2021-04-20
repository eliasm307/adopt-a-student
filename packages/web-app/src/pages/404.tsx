import React from 'react';

import Layout from '../layouts/DefaultLayout';

export default function Home() {
  return (
    <Layout>
      <p>Are you lost?</p>
      <p>
        Lets get back to <a href='/app'>reality</a>
      </p>
    </Layout>
  );
}
