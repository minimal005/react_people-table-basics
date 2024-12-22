import React, { useEffect, useMemo, useState } from 'react';

import * as person from '../api';

import { Person } from '../types';

export const PeopleContext = React.createContext({
  people: [] as Person[],
  isError: false,
  isLoading: false,
  isEmptyList: false,
});

type Props = {
  children: React.ReactNode;
};
export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyList, setIsEmptyList] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    person
      .getPeople()
      .then(setPeople)
      .then(() => {
        if (people.length === 0) {
          setIsEmptyList(true);
        }
      })
      .catch(() => setIsError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }, [people]);

  const value = useMemo(
    () => ({
      people,
      isLoading,
      isError,
      isEmptyList,
    }),
    [people, isLoading, isError, isEmptyList],
  );

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
