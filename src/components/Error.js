import React from 'react';

export const Error = ({ error }) => {
  return (
    <div className="text-red-500 text-lg mt-2 mb-1">{error}</div>
  );
};
