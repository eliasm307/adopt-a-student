import { navigate } from 'gatsby';

export const getUser = () => ({
  name: "",
  email: "",
});
export const isLoggedIn = () => true;
export const logout = (args: any) => navigate(`/app/login`);
