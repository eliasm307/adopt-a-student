import { navigate } from 'gatsby';
import React, { useCallback, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { auth } from 'src/utils/firebase-client';

import { FormFieldId, RoutePath } from '../constants';
import { useAuthData } from '../hooks';
import { UserAuthStatus } from '../providers/UserAuthProvider';
import { signInWithGoogle, signUpWithEmailPassword } from '../utils/auth';
import log from '../utils/log';
import { FormFieldEmail, FormFieldPassword, FormHeaderGraphic } from './Form';

const UserSignUpForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [showValidation, setShowValidation] = useState(false);
  const { user, userIsSignedOut } = useAuthData();

  log(`typeof user ${typeof user}`);

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event): void => {
      const { currentTarget } = event;

      if (currentTarget instanceof EventTarget) {
        const { name, value } = currentTarget;
        switch (name) {
          case FormFieldId.Email.toString():
            return setEmail(value);
          case FormFieldId.Password.toString():
            return setPassword(value);
          default:
            return console.error(`Unknown html event target "${name}"`);
        }
      } else {
        console.warn("Unknown event", { event });
      }
    },
    []
  );

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const form = event.currentTarget;

      if (form.checkValidity()) {
        await signUpWithEmailPassword(email, password);
      }

      // if (!showValidation) setShowValidation(true);
    },
    [email, password]
  );

  if (typeof user === "object") {
    // log("sign-in", "user signed in, navigating to app role select...");
    navigate(RoutePath.App, { replace: true, state: { user } }); // todo utilise this on receipient routes
    return null;
  }
  log("sign-in", "NOT navigating to app role select...", {
    user,
    authUser: auth.currentUser,
  });

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
          <FormFieldEmail
            onChange={onChangeHandler}
            controlId={FormFieldId.Email}
          />

          <FormFieldPassword
            controlId={FormFieldId.Password}
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
