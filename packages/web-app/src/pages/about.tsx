// info about the site

// todo implement?

import { navigate } from 'gatsby';
import React from 'react';
import { RoutePath } from 'src/constants';

import isBrowser from '../utils/isBrowser';

export default function About() {
  if (isBrowser()) navigate(RoutePath.App);
  return null;
}
