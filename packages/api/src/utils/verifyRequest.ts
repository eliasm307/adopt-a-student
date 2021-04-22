import { CallableContext } from 'firebase-functions/lib/providers/https';

import { functionsHttps } from './firebase/firebase-admin';

interface Auth {
  uid: string;
}

/** Does general verification on request data */
export default function verifyRequest(
  _data: any,
  context: CallableContext
): Auth {
  if (!context.auth?.uid) {
    console.error(__filename, "User not authenticated", { auth: context.auth });
    throw new functionsHttps.HttpsError(
      "unauthenticated",
      "Requesting user is not authenticated",
      { auth: context.auth }
    );
  }

  return context.auth;
}
