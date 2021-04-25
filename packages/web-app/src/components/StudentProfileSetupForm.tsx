import React, { useCallback, useContext, useRef, useState } from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import MultiSelect from 'react-multi-select-component';
import { useAuthData } from 'src/hooks';

import { Country, countryNames, LocaleCode, localeEnglishNames } from '@adopt-a-student/common';

import { FormFieldId } from '../constants';
import { MultiSelectOption } from '../declarations/interfaces';
import {
  UserPrivateDataContext as UserPrivateStudentDataContext,
} from '../providers/PrivateStudentDataProvider';
import { createNewStudentUser } from '../utils/api';
import FormFieldMultiSelect from './Form/FormFieldMultiSelect';
import FormFieldText from './Form/FormFieldText';
import FormHeaderGraphic from './Form/FormHeaderGraphic';

const localeOptions: MultiSelectOption[] = Object.entries(
  localeEnglishNames
).map(([locale, namesMap]) => {
  // todo use native locale name if available
  const name = Object.keys(namesMap)[0];
  const label = `${name} (${locale})`;
  return { label, value: locale } as MultiSelectOption;
});

const countryOptions: MultiSelectOption[] = countryNames.map(
  (country) => ({ label: country, value: country } as MultiSelectOption)
);

/** User  */
const StudentPreferencesForm = () => {
  const user = useAuthData();
  const [selectedLocales, setSelectedLocales] = useState<MultiSelectOption[]>(
    []
  );
  const [selectedCountries, setSelectedCountries] = useState<
    MultiSelectOption[]
  >([]);
  const [userName, setUserName] = useState("");
  const { updateUserPrivateStudentData } = useContext(
    UserPrivateStudentDataContext
  );
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event): void => {
      const { currentTarget } = event;

      if (currentTarget instanceof EventTarget) {
        const { name, value } = currentTarget;
        switch (name) {
          case FormFieldId.UserName.toString():
            return setUserName(value);
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

      if (!user)
        return console.error(
          "StudentPreferencesForm",
          "cant submit, user not signed in"
        );

      // validate inputs
      if (!form.checkValidity())
        return console.log(
          "StudentPreferencesForm",
          "cant submit, inputs invalid"
        );

      const { email, photoURL } = user;

      if (!email)
        console.warn("StudentPreferencesForm", "user does not have an email");

      if (!selectedLocales.length) return alert("Select some languages");

      if (!selectedCountries.length)
        return alert("Select your country or countries");

      // prevent other submits
      if (submitButtonRef.current) submitButtonRef.current.disabled = true;

      // create user
      console.log("StudentPreferencesForm", "creating student user...");

      const result = await createNewStudentUser({
        email: email || "anonymous",
        userName,
        imageUrl: photoURL,
        prefferedCountries: selectedCountries.map(
          (country) => country.value as Country
        ),
        prefferedLocales: selectedLocales.map(
          (locale) => locale.value as LocaleCode
        ),
      }).finally(() => {
        // re-enable button in any case
        if (submitButtonRef.current) submitButtonRef.current.disabled = false;
      });

      console.log("StudentPreferencesForm", "student user created");

      updateUserPrivateStudentData(result.student);
    },
    [
      updateUserPrivateStudentData,
      user,
      userName,
      selectedLocales,
      selectedCountries,
    ]
  );

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
            <FormHeaderGraphic hideTextImage />
            <h2 style={{ padding: "20px 0" }}>Setup your student profile</h2>
            {user?.photoURL && (
              <Image fluid src={user?.photoURL} alt='User profile image' />
            )}

            <FormFieldText
              controlId={FormFieldId.UserName}
              onChange={onChangeHandler}
              label='User Name'
              required
            />

            <FormFieldMultiSelect
              label='Locales Custom field'
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

export default StudentPreferencesForm;
