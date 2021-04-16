export type LocaleCode = "en" | "fr"; // todo add more

export type Country = "United Kingdom" | "Brazil" | "Cote d'Ivoire"; // todo add more

export type ObjectMap<K extends string | number, V> = {
  [key in K]: V | undefined;
};
