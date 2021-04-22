import {
  isLocaleSubjectData, isPrivateTutorData, LinkTutorAndSubjectRequestBody,
  LinkTutorAndSubjectResponseBody, LocaleSubjectData, PrivateTutorData, UserSubjectData,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../../../constants';
import { AuthData } from '../../../declarations/interfaces';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import linkDocuments, { AddDocumentLinkProps } from '../../../utils/links/linkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

const linkTutorAndSubject: InternalHandler<
  LinkTutorAndSubjectRequestBody & AuthData,
  LinkTutorAndSubjectResponseBody
> = async (body) => {
  const { data, uid } = body;

  const document1Props: AddDocumentLinkProps<
    PrivateTutorData,
    UserSubjectData
  > = {
    collectionPath: TUTOR_COLLECTION_NAME,
    dataPredicate: isPrivateTutorData,
    linkToAdd: data,
    linkReducer: ({ id }) => id,
    linksPropName: "relatedStudents",
    id: uid,
  };

  const { id } = data;

  const document2Props: AddDocumentLinkProps<LocaleSubjectData, string> = {
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    dataPredicate: isLocaleSubjectData,
    linkToAdd: uid,
    linkReducer: (link) => link,
    linksPropName: "relatedTutors",
    id,
  };

  const [updatedTutor, updatedSubject] = await linkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });

  return {
    subject: updatedSubject,
    tutor: updatedTutor,
  } as LinkTutorAndSubjectResponseBody;
};

export default linkTutorAndSubject;
