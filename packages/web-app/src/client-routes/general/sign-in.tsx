import { navigate } from 'gatsby';
import React, { useState } from 'react';

const handleLogin = (input: any) => true;

const isLoggedIn = () => true;

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (
    event: JSX.TargetedMouseEvent<HTMLButtonElement>,
    _email: string,
    _password: string
  ): void => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({ userName, password });
  };

  const onChangeHandler = (
    event: TargetedEvent<HTMLInputElement, Event>
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

  if (isLoggedIn()) {
    navigate(`/app/profile`);
  }

  return (
    <>
      <h1>Log in</h1>
      <form
        method='post'
        onSubmit={(event) => {
          handleSubmit(event);
          navigate(`/app/profile`);
        }}
      >
        <label>
          Username
          <input type='text' name='username' onChange={handleUpdate} />
        </label>
        <label>
          Password
          <input type='password' name='password' onChange={handleUpdate} />
        </label>
        <input type='submit' value='Log In' />
      </form>
    </>
  );
};

export default Login;
