import { navigate } from 'gatsby';
import { auth, GoogleAuthProvider } from 'src/utils/firebase-client';

import { UserRole } from '../declarations/types';

export const signOut = async () => {
  await auth.signOut();
  navigate(`/`);
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
    console.log("Signed in successfully using google");
  } catch (error) {
    console.error({ error });
    alert("Could not sign in");
  }
};

// todo set this up
export const signInWithEmailPassword = async (
  email: string,
  password: string
) => {
  // const provider = new EmailAuthProvider();
  // auth.signInWithPopup(provider);
  if (!email || !password)
    return console.error("Invalid arguments for sign in with email"); // todo this should be in form validation
  try {
    await auth.signInWithEmailAndPassword(email, password);
    console.log("signed in successfully using email and password");
  } catch (error) {
    console.error(__filename, "Could not sign in", { error });
    alert("Could not sign in");
  }
};

export const signUpWithEmailPassword = async (
  email: string,
  password: string,
  role: UserRole
) => {
  // const provider = new EmailAuthProvider();
  // auth.signInWithPopup(provider);
  if (!email || !password)
    return console.error("Invalid arguments for sign in with email"); // todo this should be in form validation
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    console.log(
      `created new user auth using email and password, now creating ${role} profile`
    );
  } catch (error) {
    console.error(__filename, "Could not create new user", { error });
    alert("Could not sign in");
  }
};

export const signInAnonymously = async (role: UserRole) => {
  console.log("auth", "trying to sign in anonymously");
  try {
    await auth.signInAnonymously();
    console.log("Signed in anonymously, creating anonymous user");
  } catch (error) {
    console.error("auth", { error });
    alert("Could not sign in");
  }
};
