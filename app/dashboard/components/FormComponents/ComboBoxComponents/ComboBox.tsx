import React, { useState } from "react";

interface Tag {
  id: number;
  name: string;
}

interface TaskFormProps {
  fetchTasks: Function;
  tags: Tag[];
}

const ComboBox: React.FC<TaskFormProps> = ({ tags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setIsOpen(true);
  };

  const handleTagSelect = (tag: Tag) => {
    setSearchText(tag.name);
    setSelectedTag(tag);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputClick = () => {
    if (searchText === "") {
      setSearchText("");
    }
  };

  return (
    <div className="relative" id="hs-combobox-basic-usage">
      <div className="relative">
        <input
          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm bg-white text-gray-800 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          type="text"
          role="combobox"
          aria-expanded={isOpen ? "true" : "false"}
          aria-activedescendant={
            selectedTag?.id ? `tag-${selectedTag.id}` : undefined
          }
          value={searchText}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={searchText === "" ? "Comience a escribir" : ""}
          aria-autocomplete="list"
        />
        <div
          className="absolute top-1/2 end-3 -translate-y-1/2 cursor-pointer"
          onClick={toggleDropdown}
          aria-expanded={isOpen ? "true" : "false"}
        >
          <svg
            className="shrink-0 size-3.5 text-gray-500"
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
            <path d="m7 15 5 5 5-5"></path>
            <path d="m7 9 5-5 5 5"></path>
          </svg>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-150 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto">
          {tags
            .filter((tag) =>
              tag.name.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((tag) => (
              <div
                id={`tag-${tag.id}`}
                key={tag.id}
                className={`cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100`}
                onClick={() => handleTagSelect(tag)}
                role="option"
                aria-selected={selectedTag?.id === tag.id ? "true" : "false"}
              >
                <div className="flex justify-between items-center w-full">
                  <span>{tag.name}</span>
                  {selectedTag?.id === tag.id && (
                    <svg
                      className="shrink-0 size-3.5 text-blue-600"
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
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
