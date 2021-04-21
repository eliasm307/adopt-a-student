import { localeCodes } from '../../../common/src/utils/locales';

export default function getRandomLocales(): string[] {
  const count = Math.floor(Math.random() * localeCodes.length);

  const selected = new Set<string>();

  for (let i = 0; i < count; i++) {
    const locale = localeCodes[Math.floor(Math.random() * localeCodes.length)];
    selected.add(locale);
  }

  return [...selected];
}
