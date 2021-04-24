import { navigate } from 'gatsby';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { RoutePath } from 'src/constants';
import { signInWithGoogle, signUpWithEmailPassword } from 'src/utils/auth';
import { auth } from 'src/utils/firebase-client';

import { useAuthData } from '../hooks';
import { FormFieldEmail, FormFieldPassword, FormHeaderGraphic } from './Form';

const UserSignUpForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const user = useAuthData();

  console.log(`typeof user ${typeof user}`);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const form = event.currentTarget;

      if (form.checkValidity()) signUpWithEmailPassword(email, password);

      if (!showValidation) setShowValidation(true);
    },
    [email, password, showValidation]
  );

  if (user) {
    console.log("sign-in", "user signed in, navigating to app role select...");
    navigate(RoutePath.App);
    return null;
  }
  console.log("sign-in", "NOT navigating to app role select...", {
    user,
    authUser: auth.currentUser,
  });

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
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
        <FormHeaderGraphic hideTextImage />

        <h2>Sign Up to Discover More</h2>
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
          <FormFieldEmail onChange={onChangeHandler} controlId='userEmail' />

          <FormFieldPassword
            controlId='userPassword'
            onChange={onChangeHandler}
          />

          <Button variant='primary' type='submit' className='col m-1'>
            Sign up
          </Button>

          <Button
            variant='primary'
            type='button'
            className='col'
            onClick={() => signInWithGoogle()}
          >
            Sign up with Google
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default UserSignUpForm;
