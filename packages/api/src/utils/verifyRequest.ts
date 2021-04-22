import { CallableContext } from 'firebase-functions/lib/providers/https';

import { functionsHttps } from './firebase/firebase-admin';

interface Auth {
  uid: string;
}

/** Does basic verification on request data */
export default function verifyRequest(
  body: any,
  context: CallableContext
): Auth {
  // check user is authenticated
  if (!context.auth?.uid) {
    const error = "Requesting user is not authenticated";
    console.error(__filename, { error, auth: context.auth });
    throw new functionsHttps.HttpsError("unauthenticated", error, {
      auth: context.auth,
    });
  }

  // check any request data was provided
  if (!body || (typeof body === "object" && !Object.keys(body).length)) {
    const error = "No data provided";
    throw new functionsHttps.HttpsError("failed-precondition", error);
  }

  return context.auth;
}
