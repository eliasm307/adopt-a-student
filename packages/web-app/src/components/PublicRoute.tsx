import React from 'react';

import { RouteComponentProps } from '@reach/router';

import { BaseRouteProps } from '../declarations/interfaces';
import NavBar from './NavBar';

interface Props extends RouteComponentProps, BaseRouteProps {
  component: any;
}

const PublicRoute = ({
  component: Component,
  location,
  navbarLinks: links,
  title,
  ...rest
}: Props) => (
  <>
    <NavBar links={links} title={title} /> <Component {...rest} />
  </>
);

export default PublicRoute;
