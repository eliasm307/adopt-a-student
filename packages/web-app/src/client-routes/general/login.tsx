import { navigate } from 'gatsby';
import React, { useState } from 'react';

const handleLogin = (input: any) => true;

const isLoggedIn = () => true;

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({ userName, password });
  };

  const handleUpdate = (event) => {};

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
