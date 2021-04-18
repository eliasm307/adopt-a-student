import {
  isLocaleSubjectData, isPrivateStudentData, LocaleSubjectData, PrivateStudentData,
  UnlinkStudentAndSubjectRequestBody, UnlinkStudentAndSubjectResponseBody, UserSubjectData,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME, STUDENT_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import unlinkDocuments, { RemoveDocumentLinkProps } from '../../../utils/links/unlinkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

const unlinkStudentAndLocaleSubject: FirebaseCallableFunctionHandler<
  UnlinkStudentAndSubjectRequestBody,
  UnlinkStudentAndSubjectResponseBody
> = async (body, context) => {
  const { uid } = verifyRequest(body, context);

  // verify received data
  if (!body || !body.id)
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not link documents because provided data is not valid"
    );
  const { id } = body;

  const document1Props: RemoveDocumentLinkProps<
    PrivateStudentData,
    UserSubjectData
  > = {
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    linkReducer: ({ id }) => id,
    filterPredicate: ({ id: link }) => link !== id,
    linksPropName: "relatedSubjects",
    id: uid,
  };

  const document2Props: RemoveDocumentLinkProps<LocaleSubjectData, string> = {
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    dataPredicate: isLocaleSubjectData,
    filterPredicate: (link) => link !== uid,
    linkReducer: (link) => link,
    linksPropName: "relatedStudents",
    id,
  };

  const [updatedDocument1, updatedDocument2] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });

  return { message: "Success" };
};

export default unlinkStudentAndLocaleSubject;
