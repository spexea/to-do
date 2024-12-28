import React from "react";

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => (
  <div
    className="alert alert-error mb-6 rounded-lg shadow-md transition-all duration-300 ease-in-out w-full max-w-lg mx-auto p-4"
    role="alert"
    aria-live="assertive"
  >
    <span>{message}</span>
    {onClose && (
      <button
        className="ml-4 text-xl focus:outline-none"
        onClick={onClose}
        aria-label="Cerrar alerta"
      >
        &times;
      </button>
    )}
  </div>
);

export default ErrorAlert;
