import faker from 'faker';

import { PrivateTutorData } from '../../../common/src';
import newGuid from '../newGuid';
import getRandomLocales from './getRandomLocales';

export default function createFakeTutorData(): PrivateTutorData {
  return {
    email: faker.internet.email(),
    id: newGuid(),
    userName: faker.internet.userName(),
    imageUrl: faker.image.avatar(),
    introduction: faker.lorem.lines(Math.random() * 3),
    prefferedLocales: getRandomLocales(),
    relatedSubjects: [],
    relatedStudents: [],
  };
}
