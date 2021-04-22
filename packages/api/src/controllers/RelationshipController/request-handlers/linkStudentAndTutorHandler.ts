import {
  isPrivateStudentData, isPrivateTutorData, LinkedStudentData, LinkedTutorData,
  LinkStudentAndTutorRequestBody, LinkStudentAndTutorResponseBody, PrivateStudentData,
  PrivateTutorData,
} from '@adopt-a-student/common';

import { STUDENT_COLLECTION_NAME, TUTOR_COLLECTION_NAME } from '../../../constants';
import { InternalHandler } from '../../../declarations/types';
import { firestoreAdmin } from '../../../utils/firebase/firebase-admin';
import linkDocuments, { AddDocumentLinkProps } from '../../../utils/links/linkDocuments';
import verifyRequest from '../../../utils/verifyRequest';
import extractPublicStudentData from '../../StudentController/utils/extractPublicStudentData';
import extractPublicTutorData from '../../TutorController/request-handlers/utils/extractPublicTutorData';

const linkStudentAndTutor: InternalHandler<
  LinkStudentAndTutorRequestBody,
  LinkStudentAndTutorResponseBody
> = async (props) => {
  const { studentId, tutorId } = props;

  const document1Props: AddDocumentLinkProps<
    PrivateStudentData,
    LinkedTutorData
  > = {
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    documentId: studentId,
    linkToAdd: { id: tutorId },
    linkReducer: (link) => link.id,
    linksPropName: "relatedTutors",
  };

  const document2Props: AddDocumentLinkProps<
    PrivateTutorData,
    LinkedStudentData
  > = {
    collectionPath: TUTOR_COLLECTION_NAME,
    dataPredicate: isPrivateTutorData,
    documentId: tutorId,
    linkToAdd: { id: studentId },
    linkReducer: (link) => link.id,
    linksPropName: "relatedStudents",
  };

  const [updatedStudent, updatedTutor] = await linkDocuments({
    document1Props,
    document2Props,
    firestoreAdmin,
  });

  // todo this should use some sort of request mechanism instead of automatically adding
  /*
// todo put these in request arrays then a user can decide to reject or accept request,
rejecting a request should not delete it but keep it there as rejected, this would then disallow subsequent requests to be sent?
*/

  // ? should this return the user data?
  return {
    student: extractPublicStudentData(updatedStudent),
    tutor: extractPublicTutorData(updatedTutor),
  } as LinkStudentAndTutorResponseBody;
};

export default linkStudentAndTutor;
