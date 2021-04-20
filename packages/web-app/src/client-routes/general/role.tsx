// users choose what role they want to use the app in for this session

import React from 'react';

import { getUser } from '../../services/auth';

// todo shows public data

// ! shows private data

const Overview = () => (
  <>
    <h1>Your profile</h1>
    <ul>
      <li>Name: {getUser().name}</li>
      <li>E-mail: {getUser().email}</li>
    </ul>
  </>
);

export default Overview;
