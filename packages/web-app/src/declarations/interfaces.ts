import { MouseEventHandler } from 'react';
import { FireBaseUser } from 'src/utils/firebase-client';

import { UserRole } from './types';

export interface UserAuth extends FireBaseUser {
  role?: UserRole;
}
export interface NavBarLinkData {
  action?: MouseEventHandler<HTMLButtonElement>;
  text: string;
  url?: string;
}
export interface BaseRouteProps {
  links?: NavBarLinkData[];
  title: string;
}
