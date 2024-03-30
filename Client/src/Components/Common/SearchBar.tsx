import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  style?: React.CSSProperties;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  placeholder,
  style,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-2 mb-8 border font-work-sans border-grey rounded-md focus:outline-none focus:ring-1 focus:ring-blue"
      value={searchTerm}
      onChange={onSearchChange}
      style={style}
    />
  );
};

export default SearchBar;
