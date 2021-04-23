import React from 'react';

import { RouteComponentProps } from '@reach/router';

const PublicRoute = ({
  component: Component,
  location,
  ...rest
}: RouteComponentProps<any>) => <Component {...rest} />;

export default PublicRoute;
