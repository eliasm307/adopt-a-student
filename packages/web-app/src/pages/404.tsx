import React from 'react';
import { RoutePath } from 'src/constants';

import Layout from '../layouts/DefaultLayout';

export default function Home() {
  return (
    <Layout>
      <p>Are you lost?</p>
      <p>
        Lets go back <a href={RoutePath.Home}>home</a>
      </p>
    </Layout>
  );
}
