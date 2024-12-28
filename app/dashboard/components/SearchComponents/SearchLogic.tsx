import React, { useReducer, useState } from "react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md">
        <button
          onClick={onClose}
          className="text-red-600 float-right font-bold"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

type State = {
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
};

type Action =
  | { type: "SET_QUERY"; payload: string }
  | { type: "START_LOADING" }
  | { type: "STOP_LOADING" }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_ERROR" };

const initialState: State = {
  searchQuery: "",
  isLoading: false,
  error: null,
};

const searchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, searchQuery: action.payload };
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "STOP_LOADING":
      return { ...state, isLoading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

interface TaskSearchProps {
  onResults: (tasks: any[]) => void;
}

const TaskSearch: React.FC<TaskSearchProps> = ({ onResults }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

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
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error fetching tasks. Please try again later.",
      });
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

  const handleSearch = () => {
    if (state.searchQuery.trim() === "") {
      dispatch({ type: "SET_ERROR", payload: "Please enter a search query" });
      return;
    }
    fetchTasks();
  };

  return (
    <div className="flex flex-col items-start gap-4 w-full md:w-3/4 lg:w-2/3 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative flex flex-col sm:flex-row items-start gap-4 w-full">
        <input
          type="text"
          placeholder="Search tasks..."
          value={state.searchQuery}
          onChange={(e) =>
            dispatch({ type: "SET_QUERY", payload: e.target.value })
          }
          onKeyUp={(e) => e.key === "Enter" && handleSearch()}
          className="input input-bordered w-full sm:w-[calc(100%-6rem)] rounded-lg shadow-md py-3 px-4"
        />
        <button
          className="btn btn-primary rounded-lg shadow-md py-3 px-6 mt-3 sm:mt-0 w-full sm:w-auto"
          onClick={handleSearch}
          disabled={state.isLoading}
        >
          {state.isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {state.error && (
        <span className="text-red-600 text-sm font-medium mt-2">
          {state.error}
        </span>
      )}
    </div>
  );
};

export default SearchModal;
