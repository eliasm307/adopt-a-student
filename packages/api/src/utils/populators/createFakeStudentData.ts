import faker from 'faker';

import { PrivateTutorData } from '@adopt-a-student/common';

import newGuid from '../newGuid';
import getRandomLocales from './getRandomLocales';
import getRandomUserLocales from './getRandomUserLocales';

export default function createFakeTutorData(): PrivateTutorData {
  return {
    email: faker.internet.email(),
    id: newGuid(),
    userName: faker.internet.userName(),
    imageUrl: faker.image.avatar(),
    introduction: faker.lorem.lines(Math.random() * 3),
    prefferedLocales: getRandomUserLocales(),
    relatedSubjects: [],
    relatedStudents: [],
    available: true,
  };
}
