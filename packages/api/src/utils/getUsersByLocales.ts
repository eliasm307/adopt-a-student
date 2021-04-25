import { Country, LocaleCode, PrivateUserData, PublicUserData } from '@adopt-a-student/common';

import { FirestoreAdmin } from '../declarations/interfaces';
import groupArrayItems from './groupArrayItems';

interface Props<PublicDataType extends PublicUserData> {
  countries: Country[];
  firestoreAdmin: FirestoreAdmin;
  locales: LocaleCode[];
  publicDataExtractor: (data: any) => PublicDataType;
  userCollectionName: string;
}

export default async function getUsersByLocales<
  PublicDataType extends PublicUserData
>({
  countries: requiredCountries,
  locales: requiredLocales,
  publicDataExtractor,
  firestoreAdmin,
  userCollectionName,
}: Props<PublicDataType>): Promise<PublicDataType[]> {
  /* array-contains-any is limited to 10 values, so split this into multiple requests if necessary
    https://firebase.google.com/docs/firestore/query-data/queries#array-contains-any
   */

  const userLocalesField: keyof PrivateUserData = "prefferedLocales";
  const userCountriesField: keyof PrivateUserData = "prefferedCountries";
  const groupedLocales = groupArrayItems(requiredLocales, 10);
  const groupedCountries = groupArrayItems(requiredCountries, 10);

  // ! Only a single 'IN', 'NOT_IN', or 'ARRAY_CONTAINS_ANY' filter allowed per query.
  // filtering by country because that has more possibility of being a larger list,
  // there are a low number of locales so this should be faster to filter on manually after Firestore does the hard part
  const filteredUsersPromises = groupedCountries.flatMap((countryGroup) => {
    console.log(__filename, "Creating promise for filtering users by country", {
      userCollectionName,
      userCountriesField,
      countryGroup,
    });
    return (
      firestoreAdmin
        .collection(userCollectionName)
        // .where(userLocalesField, "array-contains-any", localesGroup)
        .where(userCountriesField, "array-contains-any", countryGroup)
        .get()
    );
  });

  console.warn(
    __filename,
    `${filteredUsersPromises.length} promises required to get users by countries and countries`,
    { locales: requiredLocales, countries: requiredCountries }
  );

  try {
    // resolve promises in parallel
    const filteredUserGroupsResults = await Promise.all(filteredUsersPromises);

    // reduce to flat list of documents
    const documents = filteredUserGroupsResults.flatMap(
      (currentGroup) => currentGroup.docs
    );

    console.log(
      __filename,
      `${documents.length} documents found after country filter`
    );

    const localesSet = new Set(requiredLocales);

    // todo use flatmap
    // process and return public user data
    return (
      documents
        // extract public data for each user
        .map((doc) => publicDataExtractor(doc.data()))
        // filter by countries
        .filter((user) => {
          const userLocales = user.prefferedLocales;

          const hasRelevantLocale =
            userLocales.filter((userLocale) =>
              requiredLocales.includes(userLocale)
            ).length > 0;

          if (hasRelevantLocale) {
            console.log(__filename, "user has relevant Locale", {
              userLocales,
              requiredLocales,
            });
            return true;
          }

          console.warn(__filename, "User does not have a required locale", {
            userLocales,
          });

          return false;
        })
    );
  } catch (error) {
    throw Error(
      `There was an issue reading data from firestore; ERROR:
      ${JSON.stringify({ error })}`
    );
  }
}
