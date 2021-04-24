import React, { useState } from 'react';
import MultiSelect from 'react-multi-select-component';
import { useAuthData } from 'src/hooks';

import { countryNames, localeEnglishNames } from '@adopt-a-student/common';

interface Props {}

export interface Option {
  disabled?: boolean;
  key?: string;
  label: string;
  value: any;
}

const localeOptions: Option[] = Object.entries(localeEnglishNames).map(
  ([locale, namesMap]) => {
    // todo use native locale name if available
    const name = Object.keys(namesMap)[0];
    const label = `${name} (${locale})`;
    return { label, value: locale } as Option;
  }
);

const countryOptions: Option[] = countryNames.map(
  (country) => ({ label: country, value: country } as Option)
);

const StudentPreferencesForm = () => {
  const user = useAuthData();
  const [selectedLocales, setSelectedLocales] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  return (
    <>
      <div>Student preferences for: {user?.displayName || "undefined"}</div>
      <pre>{JSON.stringify(selectedLocales)}</pre>
      <h3 id='selectLocalesLabel'>Preferred Locales</h3>
      <MultiSelect
        options={localeOptions}
        value={selectedLocales}
        onChange={setSelectedLocales}
        labelledBy='selectLocalesLabel'
      />
      <h3 id='selectCountriesLabel'>Preferred Countries</h3>
      <MultiSelect
        options={countryOptions}
        value={selectedCountries}
        onChange={setSelectedCountries}
        labelledBy='selectCountriesLabel'
      />
    </>
  );
};

export default StudentPreferencesForm;
