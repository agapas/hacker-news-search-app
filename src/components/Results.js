import React from 'react';
import { Error } from './Error';
import { Loading } from './Loading';

export const Results = ({ loading, error, results }) => {
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <>
      <div className="text-lg mt-2 mb-1">Results:</div>
      <ul className="list-reset leading-normal">
      {results.map(result => (
        <li key={result.objectID}>
          <a
            className={result.url ? "text-blue-600 hover:text-blue-800" : ""}
            href={result.url}
          >{result.title}</a>
        </li>))}
      </ul>
    </>
  );
}
