import { PrivateTutorData } from '@adopt-a-student/common';

import { DataMutatorMap as DataMutatorMap, DataUpdater } from '../../declarations/types';

interface Props {
  updates: any;
  existingData: PrivateTutorData;
}

const tutorDataUpdater: DataUpdater<PrivateTutorData> = ({
  updates,
  existingData,
}: Props) => {
  if (!updates) return { ...existingData };

  const newData: PrivateTutorData = { ...existingData };

  const mutators: DataMutatorMap<PrivateTutorData> = {
    id: null,
    prefferedLocales: () => {
      throw Error("Mutator not implemented");
    },
    relatedSubjects: null,
    relatedStudents: null,
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
    const mutator = mutators[key as keyof PrivateTutorData];
    if (mutator) mutator(value);

    /*
    switch (key as keyof PrivateTutorData) {
      case "email":
        if (typeof value === "string") newData.email = value;
        break;
      case "imageUrl":
        if (typeof value === "string") newData.imageUrl = value;
        break;
      case "introduction":
        if (typeof value === "string") newData.introduction = value;
        break;
      case "userName":
        if (typeof value === "string") newData.userName = value;
        break;

      default:
        console.warn(__filename, `Field "${key}" is not updatetable`);
    }
    */
  });

  return newData;
};

export default tutorDataUpdater;
