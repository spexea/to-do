import React, { useEffect } from "react";

interface SearchTriggerProps {
  onOpen: () => void;
  onClose: () => void;
}

const SearchTrigger: React.FC<SearchTriggerProps> = ({ onOpen, onClose }) => {
  useEffect(() => {
    const timeout = 1000;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k") {
        onOpen();
      }
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Enter") {
        setTimeout(() => {
          onClose();
        }, timeout);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpen, onClose]);

  return (
    <button
      onClick={onOpen}
      className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md md:shadow-lg lg:bg-transparent lg:text-black lg:shadow-none lg:pointer-events-auto hover:bg-blue-600 focus:outline-none md:mt-0"
    >
      <span className="hidden md:block">
        Press <kbd>K</kbd> to search
      </span>
      <span className="block md:hidden">
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 19a8 8 0 100-16 8 8 0 000 16zm4.293-4.293a1 1 0 011.414-1.414l4 4a1 1 0 11-1.414 1.414l-4-4z"
          />
        </svg>
      </span>
    </button>
  );
};

export default SearchTrigger;
