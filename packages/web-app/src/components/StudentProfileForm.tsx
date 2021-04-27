import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Image, Row, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAuthData } from 'src/hooks';

import {
  Country, countryNames, LocaleCode, localeEnglishNames, PrivateStudentData,
} from '@adopt-a-student/common';

import { FormFieldId } from '../constants';
import { MultiSelectOption } from '../declarations/interfaces';
import { usePrivateStudentData } from '../providers/PrivateStudentDataProvider';
import { UserAuthStatus } from '../providers/UserAuthProvider';
import { createNewStudentUser } from '../utils/api';
import log, { Logger } from '../utils/log';
import { FormFieldEmail } from './Form';
import FormFieldMultiSelect from './Form/FormFieldMultiSelect';
import FormFieldText from './Form/FormFieldText';
import FormFieldTextArea from './Form/FormFieldTextArea';
import FormHeaderGraphic, { LogoWithTextGraphic } from './Form/FormHeaderGraphic';
import Loading from './Loading';

const localeOptions: MultiSelectOption[] = Object.entries(
  localeEnglishNames
).map(([locale, namesMap]) => {
  // todo use native locale name if available
  const name = Object.keys(namesMap)[0];
  const label = `${name}`;
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const form = event.currentTarget;

      if (userIsSignedOut)
        return logger.error("cant submit, user not signed in");

      if (typeof user !== "object")
        return logger.error("cant submit, user signed in but no data", {
          userIsSignedOut,
          user,
        });

      // validate inputs
      if (!form.checkValidity())
        return logger.log("cant submit, inputs invalid");

      const { photoURL } = user;

      const email = emailRef.current?.value;
      const userName = userNameRef.current?.value;
      const introduction = introductionRef.current?.value;

      // todo use better form validation feedback, shown on the form instead of a toast

      if (!user.isAnonymous && !email)
        return toast.warn("Please enter an email");

      if (!userName) return toast.warn("Please enter a userName");

      if (!selectedLocales.length)
        return toast.warn(
          "Please select some languages you would like teachers to speak"
        );

      if (!selectedCountries.length)
        return toast.warn(
          "Please select your preferred country or countries to find teachers"
        );

      // prevent other submits
      setIsSubmitting(true);
      // if (submitButtonRef.current) submitButtonRef.current.disabled = true;

      // mutate user
      logger.log("creating student user...");

      // todo check if anything has changed to make sure this isnt called unnecessarily

      const result = await onValidSubmit({
        email: email || "anonymous",
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
        setIsSubmitting(false);
        // if (submitButtonRef.current) submitButtonRef.current.disabled = false;
      });

      logger.log("student user mutated", { result });

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
      <Row className='justify-content-md-center mb-5'>
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
              label='Display Name'
              defaultValue={user.displayName || initialData?.userName || ""}
              required
              ref={userNameRef}
            />
            {!user.isAnonymous && (
              <FormFieldEmail
                controlId={FormFieldId.Email}
                defaultValue={user.email || initialData?.email || `undefined`}
                ref={emailRef}
              />
            )}

            <FormFieldTextArea
              controlId={FormFieldId.Introduction}
              defaultValue={initialData?.introduction}
              label='Summary Statement'
              ref={introductionRef}
              description='Other users will see this on your profile'
            />

            <FormFieldMultiSelect
              label='Preferred Languages'
              onChange={setSelectedLocales}
              options={localeOptions}
              value={selectedLocales}
              description='These languages help us find compatible teachers for you'
            />

            <FormFieldMultiSelect
              label='Preferred Locations'
              options={countryOptions}
              value={selectedCountries}
              onChange={setSelectedCountries}
              description={`This is for specifying if you want teachers from a specific location, select "World" if you dont mind`}
            />

            <Button
              ref={submitButtonRef}
              variant='primary'
              type='submit'
              className='col m-1'
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>
                  <Spinner animation='border' />
                </span>
              ) : (
                `Save`
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default StudentProfileForm;
