import { navigate } from 'gatsby';
import { auth, GoogleAuthProvider } from 'src/utils/firebase-client';

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
    return console.error("Invalid arguments for sign in with email");
  try {
    await auth.signInWithEmailAndPassword(email, password);
    console.log("signed in successfully using email and password");
  } catch (error) {
    console.error(__filename, "Could not sign in", { error });
    alert("Could not sign in");
  }
};