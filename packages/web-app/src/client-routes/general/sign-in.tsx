import { navigate } from "gatsby";
import React, {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormFieldId, RoutePath } from "src/constants";
import { UserAuthStatus, UserContext } from "src/providers/UserAuthProvider";
import {
  signInWithEmailPassword,
  signInWithGoogle,
  signUpAnonymously,
} from "src/utils/auth";

import {
  FormFieldEmail,
  FormFieldPassword,
  FormHeaderGraphic,
} from "../../components/Form";
import {
  ConnectingStudentsAndTeachersGraphic,
  LogoWithTextGraphic,
} from "../../components/Form/FormHeaderGraphic";
import Loading from "../../components/Loading";
import { Logger } from "../../utils/log";

const buttonStyle: CSSProperties = {};
const buttonCssClasses = "col mb-2";

const logger = new Logger("SignIn");

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const { user, userIsSignedOut, setUser } = useContext(UserContext);

  // this is to say if the initial check for user auth has been done, it prevents automatically navigating to the next page
  const [userStateChecked, setUserStateChecked] = useState(false);

  logger.log({
    typeofUser: typeof user,
    authUser: user,
    userIsSignedOut,
  });

  useEffect(() => {
    if (userStateChecked)
      return logger.log("User initial state already checked");

    if (typeof user === "object") {
      logger.log("user signed in, navigating to home...", { user });
      // todo should this be enabled
      navigate(RoutePath.Home);
    }
  }, [user, userIsSignedOut, userStateChecked]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const form = event.currentTarget;

      if (form.checkValidity()) {
        await signInWithEmailPassword(email, password);
        await navigate(RoutePath.Home);
      }

      if (!showValidation) setShowValidation(true);
    },
    [email, password, showValidation]
  );

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
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
    },
    []
  );

  if (user === UserAuthStatus.Pending) return <Loading />;

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
            defaultValue=''
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
            onClick={async () => {
              const newUser = await signUpAnonymously();

              if (newUser) {
                setUser(newUser);
                await navigate(RoutePath.Home);
              }

              logger.warn(
                `User was ${typeof newUser} after trying to sign in anonymously`
              );
            }}
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
