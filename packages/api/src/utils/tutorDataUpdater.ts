import { PrivateTutorData } from '@adopt-a-student/common';

import { DataMutatorMap as DataMutatorMap, DataUpdater } from '../declarations/types';

interface Props {
  edits: any;
  existingData: PrivateTutorData;
}

const tutorDataUpdater: DataUpdater<PrivateTutorData> = ({
  edits,
  existingData,
}: Props) => {
  if (!edits) return { ...existingData };

  const newData: PrivateTutorData = { ...existingData };

  const mutators: DataMutatorMap<PrivateTutorData> = {
    id: null,
    relatedSubjects: null,
    students: null,
    email: (value) =>
      typeof value === "string" ? (newData.email = value) : null,
    userName: (value) =>
      typeof value === "string" ? (newData.userName = value) : null,
    imageUrl: (value) =>
      typeof value === "string" ? (newData.imageUrl = value) : null,
    introduction: (value) =>
      typeof value === "string" ? (newData.introduction = value) : null,
  };

  // apply edit mutations where possible
  Object.entries(edits).forEach(([key, value]) => {
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
        console.warn(__filename, `Field "${key}" is not edittable`);
    }
    */
  });

  return newData;
};

export default tutorDataUpdater;
