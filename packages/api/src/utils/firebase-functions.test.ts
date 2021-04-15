import { PrivateTutorData } from "@adopt-a-student/common";
import callFirebaseFunction from "../client-utils/callFirebaseFunction";
import {
  functionsEmulator,
  isFirestoreEmulatorRunning,
  functionsLive,
  auth,
} from "../client-utils/firebase-client";

/*
if (typeof process.env.FIRESTORE_EMULATOR_HOST !== "string")
  throw Error("Firestore emulator host environment variable not set");
  */

if (!isFirestoreEmulatorRunning())
  throw Error("Firestore emulator is not running");

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

describe.only("firebase functions live", () => {
  it("can call a function that writes to live", async () => {
    const data: PrivateTutorData = {
      email: "an-email",
      id: "232",
      relatedSubjects: [{ confidenceLevel: 2, detail: "2ded", id: "kkd" }],
      students: [{ id: "student1" }],
      userName: "eced",
    };

    await auth.signInAnonymously();
    const result = await callFirebaseFunction({
      name: "createTutor",
      data,
      functions: functionsEmulator,
    });

    console.log(__filename, "firestore invalid createTutor call result", {
      result,
    });

    await auth.signOut();
  });
});
