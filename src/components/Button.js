import React from 'react';

export const Button = ({
  color,
  isLast,
  type = "button",
  label,
  onClick
}) => {
  const marginRight = isLast ? "" : "mr-2";
  return (
    <button
      className={
        `w-full md:w-1/5 rounded px-2 py-1 mb-2 ${marginRight} bg-${color}-400 hover:bg-${color}-500`
      }
      type={type}
      onClick={onClick}
    >{label}</button>
  );
};
