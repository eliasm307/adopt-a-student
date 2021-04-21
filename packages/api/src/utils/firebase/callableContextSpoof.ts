import { CallableContext } from "firebase-functions/lib/providers/https";

export default function callableContextSpoof(): CallableContext {
  return { auth: { token: {}, uid: "uid" } } as CallableContext;
}
