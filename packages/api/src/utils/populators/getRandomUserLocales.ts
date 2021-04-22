import { UserLocale } from '@adopt-a-student/common';

import getRandomLocales from './getRandomLocales';

export default function getRandomUserLocales() {
  return getRandomLocales().map(
    (locale) =>
      ({
        locale,
        country: "World",
      } as UserLocale)
  );
}
