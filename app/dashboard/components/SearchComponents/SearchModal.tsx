import React from "react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md sm:max-w-[95%] lg:max-w-lg">
        {children}
      </div>
    </div>
  );
};

export default SearchModal;
