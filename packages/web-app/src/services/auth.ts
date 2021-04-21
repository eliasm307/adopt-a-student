import { navigate } from 'gatsby';
import { auth, EmailAuthProvider, GoogleAuthProvider } from 'src/utils/firebase-client';

export const signOut = async (args: any) => {
  await auth.signOut();
  navigate(`/app/login`);
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const cred = await auth.signInWithPopup(provider);
    console.log("Signed in successfully", { cred });
  } catch (error) {
    console.error({ error });
  }
};

// todo set this up
export const signInWithEmailPassword = () => {
  const provider = new EmailAuthProvider();
  auth.signInWithPopup(provider);
};
