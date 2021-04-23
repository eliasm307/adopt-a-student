import { navigate } from 'gatsby';
import path from 'path';
import React, { useContext, useState } from 'react';
import { RoutePath } from 'src/constants';
import useAuthData from 'src/hooks/useAuthData';
import UserProvider, { UserContext } from 'src/providers/UserProvider';
import { signInWithEmailPassword, signOut } from 'src/utils/auth';
import { auth } from 'src/utils/firebase-client';
import isProductionEnvironment from 'src/utils/isProductionEnvironment';
import tw from 'twin.macro';

import SVG from '../../components/SVG';

// import testUser from '../../private_config/testUserAuth';

// const svgLogo = require("../../assets/logo.svg");

// const svgPath = path.resolve("../../assets/logo.svg");

const SignInForm = tw.form`
bg-gray-500 border-2 flex flex-col items-center max-w-md m-auto`;

const TextInput = tw.input`

`;

const Button = tw.button``;

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const user = useAuthData();
  const { setUserRole } = useContext(UserContext);

  console.log(`typeof user ${typeof user}`);

  if (user) {
    console.log(
      "sign-in",
      "user signed in, navigating to app role select...DISABLED"
    );
    // navigate(RoutePath.roleSelect);
    // return null;
  }
  console.log("sign-in", "NOT navigating to app role select...", {
    user,
    authUser: auth.currentUser,
  });

  /*
  if (user && !user?.role) {
    setUserRole("Student");
  }
  */

  if (!isProductionEnvironment()) {
    console.log("Dev environment, signing in anonymously");
    // signInWithEmailPassword(testUser.email, testUser.password);
    // auth.signInAnonymously();
  }

  /*
  const signInWithEmailAndPasswordHandler = (
    event: React.ChangeEvent<HTMLButtonElement>,
    _email: string,
    _password: string
  ): void => {
    event.preventDefault();
  };
  */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailPassword(userName, password);
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { currentTarget } = event;

    if (currentTarget instanceof EventTarget) {
      const { name, value } = currentTarget;
      switch (name) {
        case "userEmail":
          return setEmail(value);
        case "userPassword":
          return setPassword(value);
        default:
          return console.error(`Unknown html event target "${name}"`);
      }
    } else {
      console.warn("Unknown event", { event });
    }
  };

  return (
    <UserProvider>
      <h1>Log in</h1>
      <div>Role: {user?.role}</div>
      <div>
        <SVG path='/assets/logo-only.svg' />
        <SVG path='/assets/connecting_students_and_teachers.svg' />
      </div>
      <SignInForm
        method='post'
        onSubmit={(event) => {
          handleSubmit(event);
          navigate(RoutePath.roleSelect);
        }}
      >
        <label htmlFor='username'>
          Username
          <input
            id='username'
            type='text'
            name='username'
            onChange={onChangeHandler}
          />
        </label>

        <label>
          Password
          <input type='password' name='password' onChange={onChangeHandler} />
        </label>
        <input type='submit' value='Log In' />
        <button type='button' onClick={() => signOut()}>
          Sign out
        </button>
      </SignInForm>
    </UserProvider>
  );
};

export default SignIn;
