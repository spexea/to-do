import React from "react";

interface SearchInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}
const SearchInput: React.FC<SearchInputProps> = ({
  inputRef,
  value,
  onChange,
  placeholder,
  onKeyDown,
}) => {
  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 placeholder-gray-500 focus:outline-none transition-all duration-200"
    />
  );
};

export default SearchInput;
