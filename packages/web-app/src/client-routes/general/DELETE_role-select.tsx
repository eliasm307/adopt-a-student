// users choose what role they want to use the app in for this session

import React from 'react';
import { RoutePath } from 'src/constants';

import RoleSelector from '../../components/RoleSelector';

const AppRoleSelect = () => {
  return <RoleSelector redirectAfterSelect={RoutePath.App} />;
};

export default AppRoleSelect;
