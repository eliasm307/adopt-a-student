import { navigate } from 'gatsby';
import React, { useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FormFieldId, RoutePath } from 'src/constants';
import { UserContext } from 'src/providers/UserAuthProvider';
import { signInAnonymously, signInWithEmailPassword, signInWithGoogle } from 'src/utils/auth';
import { auth } from 'src/utils/firebase-client';

import { FormFieldEmail, FormFieldPassword, FormHeaderGraphic } from '../../components/Form';
import log from '../../utils/log';

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

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const { user } = useContext(UserContext);

  log(`typeof user ${typeof user}`);

  if (user) {
    log("sign-in", "user signed in, navigating to app role select...");
    navigate(RoutePath.App);
    return null;
  }
  log("sign-in", "NOT navigating to app role select...", {
    user,
    authUser: auth.currentUser,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    if (form.checkValidity()) signInWithEmailPassword(email, password);

    if (!showValidation) setShowValidation(true);
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { currentTarget } = event;

    if (currentTarget instanceof EventTarget) {
      const { name, value } = currentTarget;
      switch (name) {
        case FormFieldId.Email:
          return setEmail(value);
        case FormFieldId.Password:
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
        <FormHeaderGraphic />
        <Form
          method='post'
          onSubmit={(event) => {
            handleSubmit(event);
          }}
          className='mt-3'
          style={{
            display: "grid",
            placeItems: "center",
            width: "clamp(100px, 100%, 500px)",
          }}
        >
          <FormFieldEmail
            onChange={onChangeHandler}
            controlId={FormFieldId.Email}
          />

          <FormFieldPassword
            controlId={FormFieldId.Password}
            onChange={onChangeHandler}
          />

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

export default SignIn;
