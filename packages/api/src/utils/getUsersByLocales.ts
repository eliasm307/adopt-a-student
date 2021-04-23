import { Country, LocaleCode, PrivateUserData } from '@adopt-a-student/common';

import { FirestoreAdmin } from '../declarations/interfaces';
import { functionsHttps } from './firebase/firebase-admin';
import groupArrayItems from './groupArrayItems';

interface Props<PublicDataType> {
  countries: Country[];
  firestoreAdmin: FirestoreAdmin;
  locales: LocaleCode[];
  publicDataExtractor: (data: any) => PublicDataType;
  userCollectionName: string;
}

export default async function getUsersByLocales<PublicDataType>({
  countries,
  locales,
  publicDataExtractor,
  firestoreAdmin,
  userCollectionName,
}: Props<PublicDataType>): Promise<PublicDataType[]> {
  /* array-contains-any is limited to 10 values, so split this into multiple requests if necessary
    https://firebase.google.com/docs/firestore/query-data/queries#array-contains-any
   */

  const userLocalesField: keyof PrivateUserData = "prefferedLocales";
  const userCountriesField: keyof PrivateUserData = "prefferedCountries";
  const groupedLocales = groupArrayItems(locales, 10);
  const groupedCountries = groupArrayItems(locales, 10);

  const filteredUsersPromises = groupedLocales.map((localesGroup) => [
    ...groupedCountries.map((countryGroup) =>
      firestoreAdmin
        .collection(userCollectionName)
        .where(userLocalesField, "array-contains-any", localesGroup)
        .where(userCountriesField, "array-contains-any", countryGroup)
        .get()
    ),
  ]);

  console.warn(
    __filename,
    `${filteredUsersPromises.length} promises required to get users by countries and countries`,
    { locales, countries }
  );

  try {
    // resolve promises in parallel
    const filteredUserGroupsResults = await Promise.all(filteredUsersPromises);

    // todo use flatmap
    // process and return public user data
    return (
      filteredUserGroupsResults
        // reduce to flat list
        .flatMap((currentGroup) => currentGroup)

        // extract public data for each user
        .map((data) => publicDataExtractor(data))
    );
  } catch (error) {
    throw new functionsHttps.HttpsError(
      "internal",
      "There was an issue reading data from firestore",
      JSON.stringify({ error })
    );
  }
}
