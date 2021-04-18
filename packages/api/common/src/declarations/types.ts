export type LocaleCode = "en" | "fr"; // todo add more

export type Country = "United Kingdom" | "Brazil" | "Cote d'Ivoire"; // todo add more

// ? use Record type instead?
export type ObjectMap<K extends string | number, V> = {
  [key in K]: V | undefined;
};

export type LocaleSubjectId = string;

export type GenericSubjectId = string;

export type SubjectId = GenericSubjectId | LocaleSubjectId;

export type TutorId = string;

export type StudentId = string;

export type UserId = TutorId | StudentId;

export type SubjectCategoryId = string;

export type CategoryId = string;
