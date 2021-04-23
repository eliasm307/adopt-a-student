import faker from 'faker';

import { PrivateStudentData } from '@adopt-a-student/common';

import newGuid from '../newGuid';
import getRandomCountries from './getRandomCountries';
import getRandomLocales from './getRandomLocales';
import getRandomUserLocales from './getRandomUserLocales';

export default function createFakeStudentData(): PrivateStudentData {
  return {
    email: faker.internet.email(),
    id: newGuid(),
    userName: faker.internet.userName(),
    imageUrl: faker.image.avatar(),
    introduction: faker.lorem.lines(Math.random() * 3),
    prefferedLocales: getRandomLocales(),
    prefferedCountries: getRandomCountries(),
    relatedSubjects: [],
    relatedTutors: [],
  };
}
