import { navigate } from "gatsby";
import { toast } from "react-toastify";
import {
  auth,
  FireBaseUser,
  GoogleAuthProvider,
} from "src/utils/firebase-client";

import { DEFAULT_PROFILE_IMAGE_URI } from "../constants";
import log, { Logger } from "./log";

const logger = new Logger("auth");

// todo toast messages should be managed in a central location for consistency, maybe have an enum
const SIGN_IN_ERROR_TOAST_MESSAGE = "There was an error signing in 😢";

const SIGN_UP_ERROR_TOAST_MESSAGE = "There was an error signing up 😢";

// todo add toast ids to prevent duplicates

export const signOut = async () => {
  try {
    await auth.signOut();
    toast.info("Signed out");
  } catch (error) {
    logger.error("Error signing out", { error });
    toast.error("There was an issue signing out 😢");
  } finally {
    navigate(`/`);
  }
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
    logger.log("signInWithGoogle", "Signed in successfully using google");
  } catch (error) {
    logger.error("signInWithGoogle", { error });
    toast.error(SIGN_IN_ERROR_TOAST_MESSAGE);
  }
};

export const signInWithEmailPassword = async (
  email: string,
  password: string
) => {
  // const provider = new EmailAuthProvider();
  // auth.signInWithPopup(provider);
  if (!email || !password)
    return console.error("Invalid arguments for sign in with email"); // todo this should also be in form validation
  try {
    await auth.signInWithEmailAndPassword(email, password);

    log("signed in successfully using email and password");
  } catch (error) {
    logger.error("signInWithEmailPassword", "Could not sign in", { error });

    toast.error(SIGN_IN_ERROR_TOAST_MESSAGE);
  }
};

export const signUpWithEmailPassword = async (
  email: string,
  password: string
): Promise<FireBaseUser | null> => {
  // const provider = new EmailAuthProvider();
  // auth.signInWithPopup(provider);
  if (!email || !password) {
    console.error("Invalid arguments for sign in with email"); // todo this should be in form validation
    return null;
  }
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);

    // set default profile values
    if (result.user) {
      await result.user.updateProfile({
        photoURL: DEFAULT_PROFILE_IMAGE_URI,
        displayName: "Anonymous",
      });
    }

    log(`created new user auth using email and password`);

    return result.user;
  } catch (error) {
    console.error(__filename, "Could not create new user", { error });
    toast.error(SIGN_UP_ERROR_TOAST_MESSAGE);
    return null;
  }
};

export const signUpAnonymously = async (): Promise<FireBaseUser | null> => {
  log("auth", "trying to sign in anonymously");
  try {
    const result = await auth.signInAnonymously();

    // todo amend this so it happens before screen navigation
    // set default profile values
    if (result.user)
      await result.user.updateProfile({
        photoURL: DEFAULT_PROFILE_IMAGE_URI,
        displayName: "Anonymous",
      });

    log("Signed in anonymously, successfully", { uid: result.user?.uid });
    return result.user;
  } catch (error) {
    console.error("auth", { error });
    toast.error(SIGN_IN_ERROR_TOAST_MESSAGE);
    return null;
  }
};
