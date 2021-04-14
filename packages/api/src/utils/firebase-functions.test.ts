import { functionsEmulator } from '../client/firebase-client';

const functions = functionsEmulator;

describe("firebase function emulator", () => {
  it("can write to firestore emulator", async () => {
    functions.httpsCallable(name);
  });
});
