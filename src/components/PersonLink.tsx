import React, { useContext } from 'react';
import { PeopleContext } from '../store/PeopleContext';

import { Link, useParams } from 'react-router-dom';

import { Person } from '../types';
import { findChild } from '../service/people.service';

import cn from 'classnames';

type Props = {
  person: Person;
};
export const PersonLink: React.FC<Props> = ({ person }) => {
  const { people } = useContext(PeopleContext);

  const childByMother = person.motherName
    ? findChild(people, person.motherName)
    : null;
  const childByFather = person.fatherName
    ? findChild(people, person.fatherName)
    : null;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={person.slug}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {!person.motherName && <td>-</td>}
      {person.motherName &&
        (!childByMother ? (
          <td>{person.motherName}</td>
        ) : (
          <td>
            <Link className="has-text-danger" to={childByMother.slug}>
              {person.motherName}
            </Link>
          </td>
        ))}
      {!person.fatherName && <td>-</td>}
      {person.fatherName &&
        (!childByFather ? (
          <td>{person.fatherName}</td>
        ) : (
          <td>
            <Link to={childByFather.slug}>{person.fatherName}</Link>
          </td>
        ))}
    </tr>
  );
};
