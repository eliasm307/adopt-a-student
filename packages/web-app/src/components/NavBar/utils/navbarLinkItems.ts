import { toast } from "react-toastify";

import { RoutePath } from "../../../constants";
import { NavBarLinkData } from "../../../declarations/interfaces";
import { signOut } from "../../../utils/auth";
import { Logger } from "../../../utils/log";

export const HomeNavbarLink: NavBarLinkData = {
  text: "Home",
  route: RoutePath.Home,
};

export const ProfileNavbarLink: NavBarLinkData = {
  text: "My Profile",
  route: RoutePath.Profile,
};

const logger = new Logger("navbarLinkItems");

export const SignOutNavbarLink: NavBarLinkData = {
  text: "Sign Out",
  variant: "outline-danger",
  action: async (event) => {
    event.preventDefault();
    try {
      await signOut();
      toast.info("Signed out");
    } catch (error) {
      logger.error("Error signing out", { error });
      toast.error("There was an issue signing out 😢");
    }
  },
};
