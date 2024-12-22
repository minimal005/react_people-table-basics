import React, { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePages: React.FC = () => {
  const { people, isError, isLoading } = useContext(PeopleContext);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!people.length && !isLoading && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!!people.length && !isError && <PeopleTable people={people} />}
        </div>
      </div>
    </>
  );
};
