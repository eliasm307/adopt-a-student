import {
  isLocaleSubjectData, isPrivateTutorData, LocaleSubjectData, PrivateTutorData,
  UnlinkTutorAndSubjectRequestBody, UnlinkTutorAndSubjectResponseBody, UserSubjectData,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../../../constants';
import { AuthData } from '../../../declarations/interfaces';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import unlinkDocuments, { RemoveDocumentLinkProps } from '../../../utils/links/unlinkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

const unlinkTutorAndSubject: InternalHandler<
  UnlinkTutorAndSubjectRequestBody & AuthData,
  UnlinkTutorAndSubjectResponseBody
> = async (body) => {
  const { id: subjectId, country, locale, uid } = body;

  const document1Props: RemoveDocumentLinkProps<
    PrivateTutorData,
    UserSubjectData
  > = {
    collectionPath: TUTOR_COLLECTION_NAME,
    dataPredicate: isPrivateTutorData,
    linkToMutatePredicate: ({
      id: linkId,
      country: linkCountry,
      locale: linkLocale,
    }) =>
      linkId === subjectId && linkCountry === country && linkLocale === locale,
    linksPropName: "relatedSubjects",
    documentId: uid,
  };

  const document2Props: RemoveDocumentLinkProps<LocaleSubjectData, string> = {
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    dataPredicate: isLocaleSubjectData,
    linkToMutatePredicate: (link) => link === uid,
    linksPropName: "relatedStudents",
    documentId: subjectId,
  };

  const [tutor, subject] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });

  return { subject, tutor } as UnlinkTutorAndSubjectResponseBody;
};

export default unlinkTutorAndSubject;
