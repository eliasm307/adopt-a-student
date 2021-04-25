import faker, { random } from 'faker';

import { PrivateTutorData } from '@adopt-a-student/common';

import newGuid from '../newGuid';
import getRandomCountries from './getRandomCountries';
import getRandomLocaleCountry from './getRandomCountry';
import getRandomLocales from './getRandomLocales';
import getRandomUserLocales from './getRandomUserLocales';

export default function createFakeTutorData(): PrivateTutorData {
  return {
    email: faker.internet.email(),
    id: newGuid(),
    userName: faker.internet.userName(),
    imageUrl: faker.image.avatar(),
    introduction: faker.lorem.lines(Math.random() * 3),
    prefferedLocales: getRandomLocales(),
    prefferedCountries: getRandomCountries(),
    relatedSubjects: [], // todo randmoise this based on existing users
    relatedStudents: [],
    available: Math.random() > 0.5,
  };
}
