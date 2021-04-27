import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuthData } from "src/hooks";

import {
  Country,
  countryNames,
  LocaleCode,
  localeEnglishNames,
  PrivateStudentData,
} from "@adopt-a-student/common";

import { FormFieldId } from "../constants";
import { MultiSelectOption } from "../declarations/interfaces";
import { usePrivateStudentData } from "../providers/PrivateStudentDataProvider";
import { UserAuthStatus } from "../providers/UserAuthProvider";
import { createNewStudentUser } from "../utils/api";
import log, { Logger } from "../utils/log";
import { FormFieldEmail } from "./Form";
import FormFieldMultiSelect from "./Form/FormFieldMultiSelect";
import FormFieldText from "./Form/FormFieldText";
import FormFieldTextArea from "./Form/FormFieldTextArea";
import FormHeaderGraphic, {
  LogoWithTextGraphic,
} from "./Form/FormHeaderGraphic";
import Loading from "./Loading";

const localeOptions: MultiSelectOption[] = Object.entries(
  localeEnglishNames
).map(([locale, namesMap]) => {
  // todo use native locale name if available
  const name = Object.keys(namesMap)[0];
  const label = `${name} (${locale})`;
  return { label, value: locale, key: locale } as MultiSelectOption;
});

const countryOptions: MultiSelectOption[] = countryNames.map(
  (country) =>
    ({ label: country, value: country, key: country } as MultiSelectOption)
);

const logger = new Logger("StudentPreferencesForm");

// todo split this into smaller pieces

interface Props {
  existingData: PrivateStudentData | null;
  onValidSubmit: (
    data: Omit<PrivateStudentData, "id">
  ) => Promise<PrivateStudentData | null>;
  setUserPrivateStudentData: (data: PrivateStudentData | null) => void;
  title: string;
}

/** Form to edit student profile details */
const StudentProfileForm = ({
  setUserPrivateStudentData,
  onValidSubmit,
  title,
  existingData: initialData,
}: Props) => {
  const { user, userIsSignedOut } = useAuthData();
  const [selectedLocales, setSelectedLocales] = useState<MultiSelectOption[]>(
    []
  );
  const [selectedCountries, setSelectedCountries] = useState<
    MultiSelectOption[]
  >([]);
  // const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("");
  // const [summaryStatement, setSummaryStatement] = useState("");

  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const introductionRef = useRef<HTMLTextAreaElement>(null);

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (initialData) {
      setSelectedCountries(
        initialData.prefferedCountries.map(
          (country) =>
            ({
              label: country,
              value: country,
              key: country,
            } as MultiSelectOption)
        )
      );
      setSelectedLocales(
        initialData.prefferedLocales.map(
          (locale) =>
            ({
              label: Object.keys(localeEnglishNames[locale])[0],
              value: locale,
              key: locale,
            } as MultiSelectOption)
        )
      );
    }
  }, [initialData]);

  /*
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event): void => {
      const { currentTarget } = event;

      // todo use uncontrolled components, ie with refs instead of doing this
      if (currentTarget instanceof EventTarget) {
        const { name, value } = currentTarget;
        switch (name) {
          case FormFieldId.UserName.toString():
            return setUserName(value);

          case FormFieldId.Email.toString():
            return setEmail(value);
          case FormFieldId.Introduction.toString():
            return setSummaryStatement(value);
          default:
            return console.error(`Unknown html event target "${name}"`);
        }
      } else {
        console.warn("Unknown event", { event });
      }
    },
    []
  );
  */

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const form = event.currentTarget;

      if (userIsSignedOut)
        return console.error(
          "StudentPreferencesForm",
          "cant submit, user not signed in"
        );

      if (typeof user !== "object")
        return console.error(
          "StudentPreferencesForm",
          "cant submit, user signed in but no data",
          { userIsSignedOut, user }
        );

      // validate inputs
      if (!form.checkValidity())
        return log("StudentPreferencesForm", "cant submit, inputs invalid");

      const { photoURL } = user;

      const email = emailRef.current?.value;
      const userName = userNameRef.current?.value;
      const introduction = introductionRef.current?.value;

      // todo use better form validation feedback, shown on the form instead of a toast

      if (!email) return toast.warn("Please enter an email");

      if (!userName) return toast.warn("Please enter a userName");

      if (!selectedLocales.length) return toast.warn("Select some languages");

      if (!selectedCountries.length)
        return toast.warn("Select your country or countries");

      // prevent other submits
      if (submitButtonRef.current) submitButtonRef.current.disabled = true;

      // mutate user
      log("StudentPreferencesForm", "creating student user...");

      // todo check if anything has changed to make sure this isnt called unnecessarily

      const result = await onValidSubmit({
        email,
        userName,
        introduction,
        imageUrl: photoURL,
        prefferedCountries: selectedCountries.map(
          (country) => country.value as Country
        ),
        prefferedLocales: selectedLocales.map(
          (locale) => locale.value as LocaleCode
        ),
        relatedSubjects: initialData?.relatedSubjects || [], // todo implememnt editor
        relatedTutors: initialData?.relatedTutors || [], // todo implement editor
      }).finally(() => {
        // re-enable button in any case
        if (submitButtonRef.current) submitButtonRef.current.disabled = false;
      });

      logger.log("student user created", { result });

      setUserPrivateStudentData(result);
    },
    [
      setUserPrivateStudentData,
      user,
      selectedLocales,
      selectedCountries,
      userIsSignedOut,
      onValidSubmit,
      initialData?.relatedSubjects,
      initialData?.relatedTutors,
    ]
  );

  if (user === UserAuthStatus.Pending) {
    logger.log("loading", { user });
    return <Loading />;
  }

  if (typeof user !== "object") {
    logger.error("user is signed in but no data", { userIsSignedOut, user });
    return <div>Error user data not defined</div>;
  }

  return (
    <>
      <Row className='justify-content-md-center mt-4'>
        <Col
          lg={10}
          className='justify-contents-center'
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
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
            {title && <h2 style={{ padding: "20px 0" }}>{title}</h2>}
            {user?.photoURL ? (
              <Image fluid src={user?.photoURL} alt='User profile image' />
            ) : (
              <LogoWithTextGraphic />
            )}

            <FormFieldText
              controlId={FormFieldId.UserName}
              label='User Name'
              defaultValue={user.displayName || initialData?.userName || ""}
              required
              ref={userNameRef}
            />
            <FormFieldEmail
              controlId={FormFieldId.Email}
              defaultValue={user.email || initialData?.email || ""}
              ref={emailRef}
            />

            <FormFieldTextArea
              controlId={FormFieldId.Introduction}
              defaultValue={initialData?.introduction}
              label='Summary Statement'
              ref={introductionRef}
            />

            <FormFieldMultiSelect
              label='Preferred Languages'
              onChange={setSelectedLocales}
              options={localeOptions}
              value={selectedLocales}
            />

            <FormFieldMultiSelect
              label='Preferred Countries'
              options={countryOptions}
              value={selectedCountries}
              onChange={setSelectedCountries}
            />

            <Button
              ref={submitButtonRef}
              variant='primary'
              type='submit'
              className='col m-1'
            >
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default StudentProfileForm;
