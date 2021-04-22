import {
  CreateGenericSubjectRequestBody, CreateGenericSubjectResponseBody, GenericSubjectData,
  isGenericSubjectData, isLocaleSubjectData, LocaleSubjectData,
} from '@adopt-a-student/common';

import {
  GENERIC_SUBJECT_COLLECTION_NAME, LOCALE_SUBJECT_COLLECTION_NAME,
} from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import createDocument from '../../../utils/firebase/createDocument';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import newGuid from '../../../utils/newGuid';
import verifyRequest from '../../../utils/verifyRequest';
import { createLocaleSubjectId } from '../utils/localeSubjectDocumentId';

const createGenericSubject: InternalHandler<
  CreateGenericSubjectRequestBody,
  CreateGenericSubjectResponseBody
> = async (props) => {
  const { data: inputData } = props;

  const { country, locale, name } = inputData;

  const genericId = newGuid();

  const localeSubjectData: LocaleSubjectData = {
    ...inputData,
    id: genericId,
  };

  if (!isLocaleSubjectData(localeSubjectData))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      `Provided initial data is not valid`
    );

  const genericNamesField: keyof GenericSubjectData = "names";

  // check if a subject with the given name already exists,
  // if a generic subject already exists with a given name,
  // this means this new subject belongs as a locale subject of that existing subject category
  const existingSubjectsSnapshot = await firestoreAdmin
    .collection(GENERIC_SUBJECT_COLLECTION_NAME)
    .where(genericNamesField, "array-contains", name)
    .get();

  if (existingSubjectsSnapshot.docs.length) {
    const error = `Tried to create a subject with name ${String(
      name
    )} however there are ${
      existingSubjectsSnapshot.docs.length
    } existing subjects with this name, try to edit existing subjects instead`;

    console.warn(__filename, error, { body: props });

    throw new functionsHttps.HttpsError("already-exists", error);
  }

  const genericSubjectData: GenericSubjectData = {
    names: [name], // assign inital name
    relatedSubjects: [],
    relatedCategories: [],
    id: genericId,
  };

  // create generic subject
  const genericSubject = await createDocument({
    collectionPath: GENERIC_SUBJECT_COLLECTION_NAME,
    id: genericId,
    data: genericSubjectData,
    dataPredicate: isGenericSubjectData,
    firestoreAdmin,
  });

  // create initial locale subject
  const localeSubject = await createDocument({
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    id: createLocaleSubjectId({ country, genericId, locale }),
    data: localeSubjectData,
    dataPredicate: isLocaleSubjectData,
    firestoreAdmin,
  });

  return {
    genericSubject,
  } as CreateGenericSubjectResponseBody;
};

export default createGenericSubject;
