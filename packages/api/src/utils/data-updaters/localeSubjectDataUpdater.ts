import { Country, LocaleCode, LocaleSubjectData } from '@adopt-a-student/common';

import { DataMutatorMap as DataMutatorMap, DataUpdater } from '../../declarations/types';

interface Props {
  edits: any;
  existingData: LocaleSubjectData;
}

const localeSubjectDataUpdater: DataUpdater<LocaleSubjectData> = ({
  edits,
  existingData,
}: Props) => {
  if (!edits) return { ...existingData };

  const newData: LocaleSubjectData = { ...existingData };

  const mutators: DataMutatorMap<LocaleSubjectData> = {
    id: null,
    studentIds: null, // change handled by a different request
    tutorIds: null, // change handled by a different request
    country: (value) =>
      typeof value === "string" ? (newData.country = value as Country) : null,
    description: (value) =>
      typeof value === "string" ? (newData.description = value) : null,
    genericSubjectId: (value) =>
      typeof value === "string" ? (newData.genericSubjectId = value) : null,
    locale: (value) =>
      typeof value === "string" ? (newData.locale = value as LocaleCode) : null,
  };

  // apply edit mutations where possible
  Object.entries(edits).forEach(([key, value]) => {
    const mutator = mutators[key as keyof LocaleSubjectData];
    if (mutator) mutator(value);
  });

  return newData;
};

export default localeSubjectDataUpdater;