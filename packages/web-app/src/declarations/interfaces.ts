import { MouseEventHandler } from 'react';

export interface NavBarLinkData {
  action?: MouseEventHandler<HTMLButtonElement>;
  text: string;
  url?: string;
}
export interface BaseRouteProps {
  isPublic: boolean;
  navbarLinks?: NavBarLinkData[];
  title: string;
}
