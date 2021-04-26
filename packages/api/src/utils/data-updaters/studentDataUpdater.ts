import { PrivateStudentData } from '@adopt-a-student/common';

import { DataMutatorMap, DataUpdater } from '../../declarations/types';

interface Props {
  existingData: PrivateStudentData;
  updates: any;
}

const studentDataUpdater: DataUpdater<PrivateStudentData> = ({
  updates,
  existingData,
}: Props) => {
  if (!updates) return { ...existingData };

  const newData: PrivateStudentData = { ...existingData };

  const mutators: DataMutatorMap<PrivateStudentData> = {
    id: null,
    relatedSubjects: null,
    prefferedLocales: (value) =>
      Array.isArray(value)
        ? [...value]
        : console.error(
            __filename,
            "Expected an array for mutator but received",
            { value }
          ), // overwrite // ! is there a way this can be typed easily without writing the methods manually?
    prefferedCountries: (value) =>
      Array.isArray(value)
        ? [...value]
        : console.error(
            __filename,
            "Expected an array for mutator but received",
            { value }
          ), // overwrite, there will be no methods to edit these partially
    relatedTutors: null,
    email: (value) =>
      typeof value === "string" ? (newData.email = value) : null,
    userName: (value) =>
      typeof value === "string" ? (newData.userName = value) : null,
    imageUrl: (value) =>
      typeof value === "string" ? (newData.imageUrl = value) : null,
    introduction: (value) =>
      typeof value === "string" ? (newData.introduction = value) : null,
  };

  // apply update mutations where possible
  Object.entries(updates).forEach(([key, value]) => {
    const mutator = mutators[key as keyof PrivateStudentData];
    if (mutator) mutator(value);
  });

  return newData;
};

export default studentDataUpdater;
