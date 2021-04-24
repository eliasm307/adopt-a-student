export const ROLE_LOCAL_STORAGE_KEY = "user.role";

// todo move enums to standalone file

// routes
export enum RoutePath {
  App = "/app",
  SignIn = "/app/sign-in",
  SignUp = "/app/sign-up",
  // SignUpRoleSelect = "/app/sign-up/role-select",
  // AppRoleSelect = "/app/role-select",
  Home = "/app/home",
  Profile = "/app/profile",
  StudentOverview = "/app/student",
  TutorOverview = "/app/tutor",
}

/** Query names used by react-query */
export enum QueryName {
  TutorsByLocales = "tutors-by-locales",
  UserStudentData = "user-student-data",
}
