import { Country, countryNames } from '@adopt-a-student/common';

export default function getRandomCountries(): Country[] {
  const count = Math.max(
    Math.floor(Math.random() * (countryNames.length - 1)) + 1,
    10
  );

  const selected = new Set<Country>();

  for (let i = 0; i < count; i++) {
    const name = countryNames[Math.floor(Math.random() * countryNames.length)];
    selected.add(name);
  }

  console.log(__filename, "Selected countries", { selected });
  return [...selected];
}
