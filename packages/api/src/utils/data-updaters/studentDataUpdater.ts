import { PrivateStudentData } from '@adopt-a-student/common';

import { DataMutatorMap, DataUpdater } from '../../declarations/types';

interface Props {
  edits: any;
  existingData: PrivateStudentData;
}

const studentDataUpdater: DataUpdater<PrivateStudentData> = ({
  edits,
  existingData,
}: Props) => {
  if (!edits) return { ...existingData };

  const newData: PrivateStudentData = { ...existingData };

  const mutators: DataMutatorMap<PrivateStudentData> = {
    id: null,
    subjects: null,
    linkedTutors: null,
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
    const mutator = mutators[key as keyof PrivateStudentData];
    if (mutator) mutator(value);
  });

  return newData;
};

export default studentDataUpdater;
