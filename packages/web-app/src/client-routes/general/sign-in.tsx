import { navigate } from 'gatsby';
import React, { CSSProperties, useContext, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FormFieldId, RoutePath } from 'src/constants';
import { UserContext } from 'src/providers/UserAuthProvider';
import { signInAnonymously, signInWithEmailPassword, signInWithGoogle } from 'src/utils/auth';
import { auth } from 'src/utils/firebase-client';

import { FormFieldEmail, FormFieldPassword, FormHeaderGraphic } from '../../components/Form';
import {
  ConnectingStudentsAndTeachersGraphic, LogoWithTextGraphic,
} from '../../components/Form/FormHeaderGraphic';
import log from '../../utils/log';

const buttonStyle: CSSProperties = {};
const buttonCssClasses = "col mb-2";

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const { user } = useContext(UserContext);

  log(`typeof user ${typeof user}`);

  if (user) {
    log("sign-in", "user signed in, navigating to app role select...");
    // todo should this be enabled
    // navigate(RoutePath.App);
    // return null;
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
        <LogoWithTextGraphic />
        <ConnectingStudentsAndTeachersGraphic />
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
            <Button
              variant='primary'
              type='submit'
              className={buttonCssClasses}
              style={buttonStyle}
            >
              Sign in
            </Button>
            <div className='mx-1' />
            <Button
              variant='primary'
              type='button'
              className={buttonCssClasses}
              style={buttonStyle}
              onClick={() => navigate(RoutePath.SignUp)}
            >
              Sign Up
            </Button>
          </Row>

          <Button
            variant='outline-primary'
            type='button'
            className={buttonCssClasses}
            style={buttonStyle}
            onClick={() => signInAnonymously()}
          >
            Continue Anonymously
          </Button>

          <Button
            variant='outline-danger'
            type='button'
            className={buttonCssClasses}
            style={buttonStyle}
            onClick={() => signInWithGoogle()}
          >
            Continue with Google
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default SignIn;
