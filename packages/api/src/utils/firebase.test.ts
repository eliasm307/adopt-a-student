import { firestoreLive } from './firebase';

if (typeof process.env.FIRESTORE_EMULATOR_HOST !== "string")
  throw Error("Firestore not started as emulator");

describe("firestore", () => {
  it("can write to emulator", async () => {
    await firestoreLive.doc("testCol/testDoc").set({ a: "b" });
    expect(1).toEqual(1);
  });
});
