import { CallableContext } from 'firebase-functions/lib/providers/https';

export default function verifyRequest(data: any, context: CallableContext) {
  if (!context.auth?.uid) throw Error("Request not authenticated");
}
