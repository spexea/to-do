import React, { useState } from "react";

interface Tag {
  id: number;
  name: string;
}

interface DropdownSelectorProps {
  tags: Tag[];
  onSelect: (tag: string) => void;
  selectedTag: string;
}

const Dropdown: React.FC<DropdownSelectorProps> = ({
  tags,
  onSelect,
  selectedTag,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (tag: string) => {
    console.log(`Tag seleccionado: ${tag}`);
    onSelect(tag);
    setIsOpen(false);
  };

  if (!tags || tags.length === 0) {
    return (
      <div className="w-full max-w-xs mx-auto">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          No tags available
        </label>
      </div>
    );
  }

  return (
    <div className="relative inline-flex w-full max-w-xs mx-auto">
      <button
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 w-full sm:w-auto"
        aria-haspopup="menu"
        aria-expanded={isOpen ? "true" : "false"}
        aria-label="Dropdown"
        onClick={toggleDropdown}
      >
        <span>{selectedTag === "all" ? "Select a Tag" : selectedTag}</span>
        <svg
          className={`transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="transition-opacity duration-150 opacity-100 min-w-[180px] sm:min-w-[220px] bg-white shadow-md rounded-lg mt-2 absolute z-20"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="p-1 space-y-0.5">
            <button
              onClick={() => handleSelect("all")}
              className={`w-full text-left py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
                selectedTag === "all" ? "bg-gray-100" : ""
              }`}
            >
              All Tasks
            </button>

            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleSelect(tag.name)}
                className={`w-full text-left py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
                  selectedTag === tag.name ? "bg-gray-100" : ""
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
