import { LocaleCode, localeCodes } from '@adopt-a-student/common';

export default function getRandomLocales(): LocaleCode[] {
  const count = Math.floor(Math.random() * (localeCodes.length - 1)) + 1;

  const selected = new Set<LocaleCode>();

  for (let i = 0; i < count; i++) {
    const locale = localeCodes[Math.floor(Math.random() * localeCodes.length)];
    selected.add(locale);
  }

  console.log(__filename, "Selected locales", { selected });
  return [...selected];
}
