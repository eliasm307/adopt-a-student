import { MouseEventHandler } from 'react';

export interface NavBarLinkData {
  action?: MouseEventHandler<HTMLButtonElement>;
  route?: string;
  text: string;
}
export interface BaseRouteProps {
  isPublic: boolean;
  navbarLinks?: NavBarLinkData[];
  title: string;
}

export interface MultiSelectOption {
  disabled?: boolean;
  key?: string;
  label: string;
  value: any;
}
