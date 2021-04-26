import { MouseEventHandler } from 'react';

export interface NavBarLinkData {
  action?: MouseEventHandler<HTMLButtonElement>;
  route?: string;
  text: string;
  variant?: "outline-primary" | "outline-danger";
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
