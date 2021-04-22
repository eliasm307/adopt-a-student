import {
  isLocaleSubjectData, isPrivateTutorData, LocaleSubjectData, PrivateTutorData,
  UnlinkTutorAndSubjectRequestBody, UnlinkTutorAndSubjectResponseBody, UserSubjectData,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../../../constants';
import { firestoreAdmin, functionsHttps } from '../../../utils/firebase/firebase-admin';
import unlinkDocuments, { RemoveDocumentLinkProps } from '../../../utils/links/unlinkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should remove subject to user and user to subject
const unlinkTutorAndSubject: InternalHandler<
  UnlinkTutorAndSubjectRequestBody,
  UnlinkTutorAndSubjectResponseBody
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
    PrivateTutorData,
    UserSubjectData
  > = {
    collectionPath: TUTOR_COLLECTION_NAME,
    dataPredicate: isPrivateTutorData,
    linkToRemovePredicate: ({ id: linkId }) => linkId !== id,
    linkToMutatePredicate: ({ id }) => id,
    linksPropName: "relatedSubjects",
    documentId: uid,
  };

  const document2Props: RemoveDocumentLinkProps<LocaleSubjectData, string> = {
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    dataPredicate: isLocaleSubjectData,
    linkToRemovePredicate: (linkId) => linkId !== uid,
    linkToMutatePredicate: (link) => link,
    linksPropName: "relatedStudents",
    documentId: id,
  };

  const [updatedDocument1, updatedDocument2] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });

  return { message: "Success" };
};

export default unlinkTutorAndSubject;
