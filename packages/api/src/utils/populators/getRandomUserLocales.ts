import getRandomLocales from './getRandomLocales';

export default function getRandomUserLocales() {
  return getRandomLocales().map((locale) => ({
    locale,
    country: "World",
  }));
}
