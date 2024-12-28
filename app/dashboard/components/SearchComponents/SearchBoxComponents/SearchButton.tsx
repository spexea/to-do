import React from "react";

interface SearchButtonProps {
  onClick: () => void;
  isLoading: boolean;
  className?: string;
}

const SearchButton = React.forwardRef<HTMLButtonElement, SearchButtonProps>(
  ({ onClick, isLoading }, ref) => (
    <button
      ref={ref}
      onClick={onClick}
      className="btn btn-primary rounded-lg shadow-md py-3 px-6 w-full sm:w-auto transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
      disabled={isLoading}
      aria-label={isLoading ? "Searching, please wait..." : "Click to search"}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin w-5 h-5 border-4 border-t-4 border-white border-transparent rounded-full"></div>
          <span>Searching...</span>
        </div>
      ) : (
        "Search"
      )}
    </button>
  )
);

export default SearchButton;
