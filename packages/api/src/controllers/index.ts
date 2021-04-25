import { RelationshipController } from './RelationshipController/RelationshipController';
import { StudentsController } from './StudentController/StudentController';
import { SubjectCategoryController } from './SubjectCategoryController/SubjectCategoryController';
import { SubjectsController } from './SubjectController/SubjectController';
import { TutorsController } from './TutorController/TutorController';

export const CallableNames = [
  ...StudentsController.callableNames,
  ...TutorsController.callableNames,
  ...SubjectsController.callableNames,
  ...SubjectCategoryController.callableNames,
  ...RelationshipController.callableNames,
];
