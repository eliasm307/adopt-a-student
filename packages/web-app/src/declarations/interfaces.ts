import { UserRole } from './types';

export interface UserAuth {
  role?: UserRole;
  uid: string;
}
