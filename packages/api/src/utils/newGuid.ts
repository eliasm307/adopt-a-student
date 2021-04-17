import { v4 as uuidv4 } from 'uuid';

export default function newGuid(): string {
  return uuidv4();
}
