import React, { useEffect, useReducer, useRef } from "react";
import {
  initialState,
  searchReducer,
} from "./SearchBoxComponents/SearchReducer";

import SearchInput from "./SearchBoxComponents/SearchInput";
import SearchButton from "./SearchBoxComponents/SearchButton";
import ErrorMessage from "./SearchBoxComponents/ErrorMessage";

interface SearchBoxProps {
  onResults: (results: any) => void;
  isOpen: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onResults, isOpen }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const fetchTasks = async () => {
    dispatch({ type: "START_LOADING" });
    dispatch({ type: "CLEAR_ERROR" });

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: state.searchQuery }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      onResults(data);
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error fetching tasks. Please try again later.",
      });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

  const handleSearch = () => {
    fetchTasks();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && buttonRef.current) {
      buttonRef.current.click();
    }
  };

  return (
    <div className="relative flex flex-col items-start gap-4 w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative flex flex-col sm:flex-row items-start gap-4 w-full">
        <SearchInput
          inputRef={inputRef}
          value={state.searchQuery}
          placeholder="Search tasks..."
          onChange={(e) =>
            dispatch({ type: "SET_QUERY", payload: e.target.value })
          }
          onKeyDown={handleKeyDown}
          className="w-full sm:w-[calc(100%-6rem)] rounded-lg shadow-md py-3 px-4"
        />
        <SearchButton
          onClick={handleSearch}
          isLoading={state.isLoading}
          ref={buttonRef}
          className="w-full sm:w-auto mt-3 sm:mt-0 rounded-lg py-3 px-6"
        />
      </div>
      <ErrorMessage error={state.error} />
    </div>
  );
};

export default SearchBox;
