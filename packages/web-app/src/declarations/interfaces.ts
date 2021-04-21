import { FireBaseUser } from 'src/utils/firebase-client';

import { UserRole } from './types';

export interface UserAuth extends FireBaseUser {
  role?: UserRole;
}
