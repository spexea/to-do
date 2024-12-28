import React, { useState, useEffect } from "react";
import SearchTrigger from "./SearchTrigger";
import SearchModal from "./SearchModal";
import SearchBox from "./SearchBox";

interface SearchProps {
  OnResults: (results: any[]) => void;
}

const Search: React.FC<SearchProps> = ({ OnResults }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const handleSearchResults = (results: any[]) => {
    if (results.length > 0) {
      setFilteredTasks(results);
    } else {
      setFilteredTasks([]);
    }
  };

  useEffect(() => {
    if (filteredTasks.length > 0 || searchQuery) {
      OnResults(filteredTasks);
    }
  }, [filteredTasks, OnResults, searchQuery]);

  return (
    <div className="p-6">
      <SearchTrigger onOpen={openSearch} onClose={closeSearch} />
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch}>
        <div className="max-w-screen-sm w-full mx-auto p-4 bg-white rounded-lg shadow-lg">
          <SearchBox onResults={setFilteredTasks} isOpen={isSearchOpen} />
        </div>
      </SearchModal>
    </div>
  );
};

export default Search;
