import {
  isLinkedLocaleSubjectData, isLocaleSubjectData, isPrivateStudentData,
  LinkStudentAndSubjectRequestBody, LinkStudentAndSubjectResponseBody, LocaleSubjectData,
  PrivateStudentData, UserSubjectData,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME, STUDENT_COLLECTION_NAME } from '../../../constants';
import { FirebaseCallableFunctionHandler } from '../../../declarations/types';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import linkDocuments, { AddDocumentLinkProps } from '../../../utils/links/linkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should add subject to user and user to subject

const linkStudentAndLocaleSubject: FirebaseCallableFunctionHandler<
  LinkStudentAndSubjectRequestBody,
  LinkStudentAndSubjectResponseBody
> = async (body, context) => {
  const { uid } = verifyRequest(body, context);

  const data = body?.data;

  // verify received data
  if (!body || !body.data || !isLinkedLocaleSubjectData(data))
    throw new functionsHttps.HttpsError(
      "failed-precondition",
      "Could not link documents because provided data is not valid"
    );

  const document1Props: AddDocumentLinkProps<
    PrivateStudentData,
    UserSubjectData
  > = {
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    linkToAdd: data,
    linkReducer: (link) => link.id,
    linksPropName: "relatedSubjects",
    id: uid,
  };

  const document2Props: AddDocumentLinkProps<LocaleSubjectData, string> = {
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    dataPredicate: isLocaleSubjectData,
    linkToAdd: uid,
    linkReducer: (link) => link,
    linksPropName: "relatedStudents",
    id: data.id,
  };

  const [updatedDocument1, updatedDocument2] = await linkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });

  return {
    message: "Success linking documents",
  };
};

export default linkStudentAndLocaleSubject;
