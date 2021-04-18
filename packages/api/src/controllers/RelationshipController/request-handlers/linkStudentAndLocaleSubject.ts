import {
  isLinkedLocaleSubjectData, isLocaleSubjectData, isPrivateStudentData, LocaleSubjectData,
  PrivateStudentData, UserSubjectData,
} from '@adopt-a-student/common';

const linkStudentAndLocaleSubject: ApiLinkStudentAndLocaleSubject = async (
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
    PrivateStudentData,
    UserSubjectData
  > = {
    collectionPath: STUDENT_COLLECTION_NAME,
    dataPredicate: isPrivateStudentData,
    linkToAdd: data,
    linkReducer: (link) => link.id,
    linksPropName: "linkedLocaleSubjects",
    id: uid,
  };

  const document2Props: AddDocumentLinkProps<LocaleSubjectData, string> = {
    collectionPath: LOCALE_SUBJECT_COLLECTION_NAME,
    dataPredicate: isLocaleSubjectData,
    linkToAdd: uid,
    linkReducer: (link) => link,
    linksPropName: "linkedStudentIds",
    id: data.id,
  };

  const [updatedDocument1, updatedDocument2] = await linkDocuments({
    document1Props,
    document2Props,
    FirestoreAdmin,
  });

  return { message: "Success linking documents" };
};

export default linkStudentAndLocaleSubject;