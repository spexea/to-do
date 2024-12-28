import React from "react";

interface ErrorMessageProps {
  error: string | null;
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) =>
  error && (
    <span className="text-red-600 text-sm font-medium mt-2">{error}</span>
  );

export default ErrorMessage;
