import { navigate } from 'gatsby';
import React, { useState } from 'react';
import useAuthData from 'src/hooks/useAuthData';
import { signInWithEmailPassword } from 'src/services/auth';
import { auth } from 'src/utils/firebase-client';
import isProductionEnvironment from 'src/utils/isProductionEnvironment';

// import testUser from '../../private_config/testUserAuth';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const user = useAuthData();

  if (user) {
    navigate(`/app/role`);
    return null;
  }
  if (!isProductionEnvironment()) {
    console.log("Dev environment, signing in anonymously");
    // signInWithEmailPassword(testUser.email, testUser.password);
    auth.signInAnonymously();
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

  const handleSubmit = (event) => {
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
          return setEmail(value as string);
        case "userPassword":
          return setPassword(value as string);
        default:
          return console.error(`Unknown html event target "${name}"`);
      }
    } else {
      console.warn("Unknown event", { event });
    }
  };

  return (
    <>
      <h1>Log in</h1>
      <form
        method='post'
        onSubmit={(event) => {
          handleSubmit(event);
          navigate(`/app/role`);
        }}
      >
        <label>
          Username
          <input type='text' name='username' onChange={onChangeHandler} />
        </label>
        <label>
          Password
          <input type='password' name='password' onChange={onChangeHandler} />
        </label>
        <input type='submit' value='Log In' />
      </form>
    </>
  );
};

export default Login;
