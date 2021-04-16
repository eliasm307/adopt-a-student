import {
  GenericSubjectCategoryData, LocaleCode, LocaleSubjectCategoryData, ObjectMap,
} from '@adopt-a-student/common';

import { DataMutatorMap as DataMutatorMap, DataUpdater } from '../../declarations/types';

interface Props {
  edits: any;
  existingData: GenericSubjectCategoryData;
}

const genericSubjectCategoryDataUpdater: DataUpdater<GenericSubjectCategoryData> = ({
  edits,
  existingData,
}: Props) => {
  if (!edits) return { ...existingData };

  const newData: GenericSubjectCategoryData = { ...existingData };

  const mutators: DataMutatorMap<GenericSubjectCategoryData> = {
    id: null,
    // todo test this works as expected
    // replace the object with the edits, this should be merged by the firestore update
    localeSubjectCategories: (value) =>
      typeof value === "object"
        ? (newData.localeSubjectCategories = value as ObjectMap<
            LocaleCode,
            LocaleSubjectCategoryData
          >)
        : null,
    genericSubjectIds: null, // change handled by a different request
  };

  // apply edit mutations where possible
  Object.entries(edits).forEach(([key, value]) => {
    const mutator = mutators[key as keyof GenericSubjectCategoryData];
    if (mutator) mutator(value);
  });

  return newData;
};

export default genericSubjectCategoryDataUpdater;
