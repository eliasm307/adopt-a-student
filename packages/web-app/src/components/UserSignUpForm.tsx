import { navigate } from "gatsby";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { auth } from "src/utils/firebase-client";

import { FormFieldId, RoutePath } from "../constants";
import { useAuthData } from "../hooks";
import { UserAuthStatus } from "../providers/UserAuthProvider";
import { signInWithGoogle, signUpWithEmailPassword } from "../utils/auth";
import log, { Logger } from "../utils/log";
import { FormFieldEmail, FormFieldPassword, FormHeaderGraphic } from "./Form";

const logger = new Logger("UserSignUpForm");

const UserSignUpForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [showValidation, setShowValidation] = useState(false);
  const { user, userIsSignedOut } = useAuthData();

  log(`typeof user ${typeof user}`);

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event): void => {
      const { currentTarget } = event;

      // todo use field refs instead
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

      if (password.length < 6) {
        toast.warn("Password should be atleast 6 characters long");
        return;
      }

      if (form.checkValidity()) {
        await signUpWithEmailPassword(email, password);
      }

      // if (!showValidation) setShowValidation(true);
    },
    [email, password]
  );

  useEffect(() => {
    const task = async () => {
      if (typeof user === "object") {
        logger.log("user signed in, navigating to app...");
        await navigate(RoutePath.Home); // todo utilise this on receipient routes
        logger.log("after wait for navigate to app");
        return;
      }
      log("sign-in", "NOT navigating to app role select...", {
        user,
        authUser: auth.currentUser,
      });
    };
    task();
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
            defaultValue=''
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
