import { RoutePath } from '../../../constants';
import { NavBarLinkData } from '../../../declarations/interfaces';
import { signOut } from '../../../utils/auth';

export const HomeNavbarLink: NavBarLinkData = {
  text: "Home",
  route: RoutePath.Home,
};

export const ProfileNavbarLink: NavBarLinkData = {
  text: "My Profile",
  route: RoutePath.Profile,
};

export const SignOutNavbarLink: NavBarLinkData = {
  text: "Sign Out",
  variant: "outline-danger",
  action: (event) => {
    event.preventDefault();
    signOut();
  },
};
