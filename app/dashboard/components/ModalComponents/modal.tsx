import { useState } from "react";
import React from "react";

interface ModalProps {
  children?: React.ReactNode;
  modalTitle?: string;
  openText?: string;
  saveText?: string;
  closeText?: string;
  onSave?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  modalTitle = "Modal title",
  openText = "Open modal",
  saveText = "Save changes",
  closeText = "Close",
  onSave,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={openModal}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ease-in-out duration-300"
      >
        {openText}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-6 z-50"
          role="dialog"
          aria-labelledby="modal-title"
          aria-hidden={!isOpen}
        >
          <div
            className="w-full max-w-lg sm:max-w-xl lg:max-w-4xl bg-white border shadow-xl rounded-2xl flex flex-col transform transition-transform duration-300 ease-in-out scale-95 opacity-0 sm:scale-100 sm:opacity-100"
            style={{
              transform: isOpen ? "scale(1)" : "scale(0.95)",
              opacity: isOpen ? 1 : 0,
            }}
          >
            <div className="flex justify-between items-center py-4 px-6 border-b">
              <h3
                id="modal-title"
                className="text-lg sm:text-2xl font-semibold text-gray-800"
              >
                {modalTitle}
              </h3>
              <button
                onClick={closeModal}
                aria-label="Close"
                className="text-gray-600 hover:text-gray-900 transition-all duration-200"
              >
                ✕
              </button>
            </div>

            <div className="flex-grow p-4 sm:p-6 overflow-y-auto">
              {children}
            </div>

            <div className="flex flex-wrap justify-end items-center gap-4 py-4 px-6 border-t">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all"
              >
                {closeText}
              </button>
              <button
                type="button"
                onClick={() => onSave && onSave()}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {saveText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
