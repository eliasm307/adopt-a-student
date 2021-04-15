import { CallableContext } from 'firebase-functions/lib/providers/https';

import { functionsHttps } from './firebase-admin';

interface Auth {
  uid: string;
}

/** Does general verification on request data */
export default function verifyRequest(
  data: any,
  context: CallableContext
): Auth {
  if (!context.auth?.uid)
    throw new functionsHttps.HttpsError(
      "unauthenticated",
      "Requesting user is not authenticated"
    );

  return context.auth;
}
