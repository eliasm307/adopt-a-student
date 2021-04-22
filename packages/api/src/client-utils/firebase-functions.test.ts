import {
  CreateTutorRequestBody,
  CreateTutorResponseBody,
  localeCountries,
  PrivateTutorData,
  selectAnyArrayItem,
} from "@adopt-a-student/common";
import isProductionEnvironment from "../utils/isProductionEnvironment";
import callFirebaseFunction from "./callFirebaseFunction";
import {
  functionsClient,
  isFirestoreEmulatorRunning,
  auth,
} from "./firebase-client";
import testUser from "../../private_config/testUserAuth";
import faker from "faker";
/*
if (typeof process.env.FIRESTORE_EMULATOR_HOST !== "string")
  throw Error("Firestore emulator host environment variable not set");
  */

if (!isProductionEnvironment() && !isFirestoreEmulatorRunning())
  throw Error(
    "Firestore emulator is not running and this is not a production environment"
  );

/*
describe("firebase function emulator", () => {
  it("can write to firestore emulator", async () => {
    const result = await callFirebaseFunction({
      name: "writeTest",
      data: { __filename, time: new Date().toLocaleString() },
      functions: functionsEmulator,
    });

    console.log(__filename, "firestore writeTest call result", { result });
  });
});
*/

describe.only("firebase functions createTutor", () => {
  beforeEach(async () => {
    await auth.signInWithEmailAndPassword(testUser.email, testUser.password);

    if (!auth.currentUser?.uid) {
      console.error(__filename, "not signed in", {
        currentUser: auth.currentUser,
      });
      throw Error("Not signed in");
    }
  });

  afterEach(async () => {
    await auth.signOut();
  });

  it("can call a function that writes to live", async () => {
    expect(auth.currentUser?.uid).toBeTruthy();

    const data: CreateTutorRequestBody = {
      // id: "232",
      tutor: {
        email: faker.internet.email(),
        prefferedLocales: [{ country: "UK", locale: "en" }],
        relatedStudents: [],
        relatedSubjects: [
          {
            confidenceLevel: 2,
            detail: faker.lorem.paragraph(Math.random() * 3),
            id: `fake-id-${Math.random() * 999}`,
            locale: "en",
            country: selectAnyArrayItem([...localeCountries.en]),
          },
        ],
        userName: faker.internet.userName(),
        imageUrl: faker.image.imageUrl(),
        introduction: faker.lorem.lines(Math.random() * 3),
        available: Math.random() > 0.5,
      },
    };

    const result = await callFirebaseFunction<
      CreateTutorRequestBody,
      CreateTutorResponseBody
    >({
      name: "createTutor",
      data,
      functions: functionsClient,
    });

    console.log(__filename, "call result", {
      result,
    });

    expect(result).toBeTruthy();
  });

  it("doesnt accept invalid data", async () => {
    const data = {
      email: "an-email",
      id: "232",
    };

    const response = await expect(
      callFirebaseFunction({
        name: "createTutor",
        data,
        functions: functionsClient,
      })
    ).rejects.toBeTruthy();
  });
});
