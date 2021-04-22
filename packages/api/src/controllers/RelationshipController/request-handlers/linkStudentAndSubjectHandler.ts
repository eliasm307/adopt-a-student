import {
  isLocaleSubjectData, isPrivateStudentData, LinkStudentAndSubjectRequestBody,
  LinkStudentAndSubjectResponseBody, LocaleSubjectData, PrivateStudentData, UserSubjectData,
} from '@adopt-a-student/common';

import { LOCALE_SUBJECT_COLLECTION_NAME, STUDENT_COLLECTION_NAME } from '../../../constants';
import { hasId } from '../../../declarations/interfaces';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import linkDocuments, { AddDocumentLinkProps } from '../../../utils/links/linkDocuments';
import verifyRequest from '../../../utils/verifyRequest';

// todo this needs to verify if the user data is complete, since the set method allows for incomplete items to be created
// todo needs to verify a user has access to this data
// todo should add subject to user and user to subject

const linkStudentAndLocaleSubject: InternalHandler<
  LinkStudentAndSubjectRequestBody & hasId,
  LinkStudentAndSubjectResponseBody
> = async (props) => {
  const { data, id } = props;

  const document1Props: AddDocumentLinkProps<
    PrivateStudentData,
    UserSubjectData
  > = {
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    linkToAdd: data,
    linkReducer: (link) => link.id,
    linksPropName: "relatedSubjects",
    id,
  };

  const document2Props: AddDocumentLinkProps<LocaleSubjectData, string> = {
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    dataPredicate: isLocaleSubjectData,
    linkToAdd: id,
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
