import { RoutePath } from '../../../constants';
import { NavBarLinkData } from '../../../declarations/interfaces';
import { signOut } from '../../../utils/auth';

export const HomeNavbarLink: NavBarLinkData = {
  text: "Home",
  url: RoutePath.Home,
};

export const ProfileNavbarLink: NavBarLinkData = {
  text: "My Profile",
  url: RoutePath.Profile,
};

export const SignOutNavbarLink: NavBarLinkData = {
  text: "Sign Out",
  action: (event) => {
    event.preventDefault();
    signOut();
  },
};
