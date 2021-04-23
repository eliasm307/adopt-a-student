import { navigate } from 'gatsby';
import path from 'path';
import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
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

/*
const Button = tw.button``;
*/

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
      <Row className='justify-content-md-center'>
        <Col
          lg={6}
          className='justify-contents-center debug'
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <h1>Log in</h1>
          <div>Role: {user?.role}</div>
          <div
            className='   debug'
            style={{
              width: "100%",
              padding: "auto auto",
              margin: "auto",
              display: "grid",
              placeItems: "center",
            }}
          >
            <SVG path='/assets/logo-only.svg' />
            <SVG path='/assets/connecting_students_and_teachers.svg' />
          </div>
          <Form
            method='post'
            onSubmit={(event) => {
              handleSubmit(event);
              navigate(RoutePath.roleSelect);
            }}
            style={{
              display: "grid",
              placeItems: "center",
            }}
          >
            <Form.Group controlId='formBasicEmail' className='w-100'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                onChange={onChangeHandler}
              />
              <Form.Text className='text-muted'>
                We&apos;ll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formBasicPassword' className='w-100'>
              <Form.Label htmlFor='password'>Password</Form.Label>
              <Form.Control
                id='password'
                name='password'
                type='password'
                placeholder='Password'
                onChange={onChangeHandler}
              />
            </Form.Group>

            <Row>
              <Button variant='primary' type='submit' className='col'>
                Sign in
              </Button>
              <Button variant='primary' type='button' className='col'>
                Sign Up
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </UserProvider>
  );
};

export default SignIn;
