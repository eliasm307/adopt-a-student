import {
  GenericSubjectCategoryData, isArray, LocaleCode, LocaleSubjectCategoryData,
} from '@adopt-a-student/common';

import { DataMutatorMap as DataMutatorMap, DataUpdater } from '../../declarations/types';

interface Props {
  existingData: GenericSubjectCategoryData;
  updates: any;
}

const genericSubjectCategoryDataUpdater: DataUpdater<GenericSubjectCategoryData> = ({
  updates,
  existingData,
}: Props) => {
  if (!updates) return { ...existingData };

  const newData: GenericSubjectCategoryData = { ...existingData };

  const mutators: DataMutatorMap<GenericSubjectCategoryData> = {
    id: null,
    // todo test this works as expected
    // replace the object with the updates, this should be merged by the firestore update
    locales: (value) =>
      typeof value === "object"
        ? (newData.locales = value as Record<
            LocaleCode,
            LocaleSubjectCategoryData
          >)
        : null,
    names: (value) => {
      if (!isArray(value)) return null;

      for (const val of value) {
        if (typeof val !== "string") {
          console.warn(
            __filename,
            "Tried to update generic subject category name with an array that wasnt all strings, did nothing",
            { value }
          );
          return null;
        }
      }

      // make sure names are Unique
      newData.names = [...new Set([...(value as string[]), ...newData.names])];
    },
    relatedSubjects: null, // change handled by a different request
  };

  // apply update mutations where possible
  Object.entries(updates).forEach(([key, value]) => {
    const mutator = mutators[key as keyof GenericSubjectCategoryData];
    if (mutator) mutator(value);
  });

  return newData;
};

export default genericSubjectCategoryDataUpdater;
