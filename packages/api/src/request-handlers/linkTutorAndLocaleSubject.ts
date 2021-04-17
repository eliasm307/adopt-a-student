import {
  LinkedLocaleSubjectData, LocaleSubjectData, PrivateTutorData,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../constants';
import { ApiLinkTutorAndLocaleSubject } from '../declarations/interfaces';
import { firestoreAdmin, functionsHttps } from '../utils/firebase/firebase-admin';
import linkDocuments, { AddDocumentLinkProps } from '../utils/links/linkDocuments';
import verifyRequest from '../utils/verifyRequest';

const linkStudentAndLocaleSubject: ApiLinkTutorAndLocaleSubject = async (
  body,
  context
) => {
  const { uid } = verifyRequest(body, context);

  const data = body?.data;

  // verify received data
  if (!body || !body.data || !isLinkedLocaleSubjectData(data))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not link documents because provided data is not valid"
    );

  const document1Props: AddDocumentLinkProps<
    PrivateTutorData,
    LinkedLocaleSubjectData
  > = {
    collectionPath: TUTOR_COLLECTION_NAME,
    dataPredicate: isPrivateTutorData,
    linkToAdd: data,
    linkReducer: ({ id }) => id,
    linksPropName: "linkedLocaleSubjects",
    id: uid,
  };

  const { id } = data;

  const document2Props: AddDocumentLinkProps<LocaleSubjectData, string> = {
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    dataPredicate: isLocaleSubjectData,
    linkToAdd: uid,
    linkReducer: (link) => link,
    linksPropName: "linkedStudentIds",
    id,
  };

  const [updatedDocument1, updatedDocument2] = await linkDocuments({
    document1Props,
    document2Props,
    firestore: firestoreAdmin,
  });

  return { message: "Success linking documents" };
};

export default linkStudentAndLocaleSubject;
