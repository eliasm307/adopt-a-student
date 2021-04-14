import callFirebaseFunction from '../client-utils/callFirebaseFunction';
import { functionsEmulator } from '../client-utils/firebase-client';

const functions = functionsEmulator;

if (typeof process.env.FIRESTORE_EMULATOR_HOST !== "string")
  throw Error("Firestore emulator host environment variable not set");

describe("firebase function emulator", () => {
  it("can write to firestore emulator", async () => {
    const result = await callFirebaseFunction({
      name: "writeTest",
      data: { __filename, time: new Date() },
      functions,
    });

    console.log(__filename, "firestore writeTest call result", { result });
  });
});
