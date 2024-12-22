import { Person } from '../types';

export const findChild = (people: Person[], parentName: string) => {
  const findPerson = people.find(person => person.name === parentName);

  return findPerson;
};
