import { navigate } from 'gatsby';
import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { RoutePath } from 'src/constants';
import { UserContext } from 'src/providers/UserProvider';
import {
  signInAnonymously, signInWithEmailPassword, signInWithGoogle, signOut,
} from 'src/utils/auth';
import { auth } from 'src/utils/firebase-client';

import Image from './Image';

// import testUser from '../../private_config/testUserAuth';

// const svgLogo = require("../../assets/logo.svg");

// const svgPath = path.resolve("../../assets/logo.svg");

/*
const SignInForm = tw.form`
bg-gray-500 border-2 flex flex-col items-center max-w-md m-auto`;

const TextInput = tw.input`

`;
*/

/*
const Button = tw.button``;
*/

const UserSignUpForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const { setUserRole, user } = useContext(UserContext);

  console.log(`typeof user ${typeof user}`);

  if (user) {
    console.log("sign-in", "user signed in, navigating to app role select...");
    navigate(RoutePath.App);
    return null;
  }
  console.log("sign-in", "NOT navigating to app role select...", {
    user,
    authUser: auth.currentUser,
  });

  // todo enable
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
    <Row className='justify-content-md-center mt-4'>
      <Col
        lg={10}
        className='justify-contents-center'
        style={{
          display: "grid",
          placeItems: "center",
          overflow: "auto",
        }}
      >
        <div
          className='  '
          style={{
            width: "100%",
            padding: "auto auto",
            margin: "auto",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Image src='logo-with-text.png' alt='Logo' />
          <Image
            src='connecting_students_and_teachers.png'
            alt='Connecting students and teachers text'
          />
        </div>
        <Form
          method='post'
          onSubmit={(event) => {
            handleSubmit(event);
            navigate(RoutePath.App);
          }}
          className='mt-3'
          style={{
            display: "grid",
            placeItems: "center",
            width: "clamp(100px, 100%, 500px)",
          }}
        >
          <Form.Group controlId='formBasicEmail' className='w-100'>
            <Form.Label>Email</Form.Label>
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              name='password'
              type='password'
              placeholder='Password'
              onChange={onChangeHandler}
            />
          </Form.Group>

          <Row className='w-100'>
            <Button variant='primary' type='submit' className='col'>
              Sign in
            </Button>

            <Button
              variant='primary'
              type='button'
              className='col'
              onClick={() => navigate(RoutePath.SignUp)}
            >
              Sign Up
            </Button>
          </Row>
          <Row>
            <Button
              variant='primary'
              type='button'
              className='col'
              onClick={() => signInAnonymously()}
            >
              Sign in Anonymously
            </Button>
          </Row>
          <Row>
            <Button
              variant='primary'
              type='button'
              className='col'
              onClick={() => signInWithGoogle()}
            >
              Sign in with Google
            </Button>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default UserSignUpForm;
