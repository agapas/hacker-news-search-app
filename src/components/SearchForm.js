import React, { useRef } from 'react';
import { Button } from './Button';

export const SearchForm = ({ onSearch, onClear, value, onChange}) => {
  const searchInputRef = useRef();

  const handleClearSearch = () => {
    onClear();
    searchInputRef.current.focus();
  }

  return (
    <form className="w-full md:flex" onSubmit={onSearch}>
      <input
        className="w-full md:w-3/5 border rounded px-2 py-1 mr-2 mb-2"
        type="text"
        ref={searchInputRef}
        value={value}
        onChange={onChange}
      />
      <Button color="yellow" label="Search" type="submit" />
      <Button
        color="green"
        label="Clear"
        isLast={true}
        onClick={handleClearSearch}
      />
    </form>
  );
}
