import {
  isLocaleSubjectData, isPrivateStudentData, LocaleSubjectData, PrivateStudentData,
  UnlinkStudentAndSubjectRequestBody, UnlinkStudentAndSubjectResponseBody, UserSubjectData,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME, STUDENT_COLLECTION_NAME } from '../../../constants';
import { AuthData } from '../../../declarations/interfaces';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import unlinkDocuments, { RemoveDocumentLinkProps } from '../../../utils/links/unlinkDocuments';
import verifyRequest from '../../../utils/verifyRequest';
import {
  createLocaleSubjectDocumentId,
} from '../../SubjectController/utils/localeSubjectDocumentId';

const unlinkStudentAndLocaleSubject: InternalHandler<
  UnlinkStudentAndSubjectRequestBody & AuthData,
  UnlinkStudentAndSubjectResponseBody
> = async (body) => {
  const { id: subjectId, country, locale, uid } = body;

  const localeSubjectDocumentId = createLocaleSubjectDocumentId({
    country,
    genericId: subjectId,
    locale,
  });

  const document1Props: RemoveDocumentLinkProps<
    PrivateStudentData,
    UserSubjectData
  > = {
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    linkReducer: ({ id }) => id,
    filterPredicate: ({ id: link }) => link !== subjectId,
    linksPropName: "relatedSubjects",
    documentId: uid,
  };

  const document2Props: RemoveDocumentLinkProps<LocaleSubjectData, string> = {
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    dataPredicate: isLocaleSubjectData,
    filterPredicate: (link) => link !== uid,
    linkReducer: (link) => link,
    linksPropName: "relatedStudents",
    documentId: localeSubjectDocumentId,
  };

  const [updatedDocument1, updatedDocument2] = await unlinkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });

  return { message: "Success" };
};

export default unlinkStudentAndLocaleSubject;
